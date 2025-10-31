"use client";
import { useEffect, useState } from "react";
import posthog from "posthog-js";
import Link from "next/link";

// Force dynamic rendering
export const dynamic = "force-dynamic";

const SURVEY_ID = "019a2d07-fc22-0000-7161-744841e9b51c";

type SurveyData = {
  mainGoal?: string;
  budget?: string;
  experience?: string;
  role?: string;
  email?: string;
  frustrations?: string[];
};

export default function GetRecommendationPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<SurveyData>({});
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const totalSteps = 6;

  // Track page view
  useEffect(() => {
    if (typeof window !== "undefined" && posthog) {
      posthog.capture("survey_started", {
        survey_id: SURVEY_ID,
        survey_name: "Rada",
      });
    }
  }, []);

  const validateStep = (): boolean => {
    setError("");

    switch (step) {
      case 1:
        if (!data.mainGoal) {
          setError("Please select your main goal");
          return false;
        }
        break;
      case 2:
        if (!data.budget) {
          setError("Please select your budget");
          return false;
        }
        break;
      case 3:
        if (!data.experience) {
          setError("Please select your experience level");
          return false;
        }
        break;
      case 4:
        if (!data.role) {
          setError("Please select your role");
          return false;
        }
        break;
      case 5:
        if (!data.email) {
          setError("Please enter your email");
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
          setError("Please enter a valid email address");
          return false;
        }
        break;
      case 6:
        // Frustrations are optional
        break;
    }

    return true;
  };

  const nextStep = () => {
    if (!validateStep()) return;

    // Track step completion
    if (typeof window !== "undefined" && posthog) {
      posthog.capture("survey_step_completed", {
        survey_id: SURVEY_ID,
        step: step,
        step_name: getStepName(step),
      });
    }

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      submitSurvey();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setError("");
    }
  };

  const getStepName = (stepNum: number): string => {
    const names = ["main_goal", "budget", "experience", "role", "email", "frustrations"];
    return names[stepNum - 1] || "";
  };

  const submitSurvey = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      // Submit survey response to PostHog
      if (typeof window !== "undefined" && posthog) {
        posthog.capture("survey_completed", {
          survey_id: SURVEY_ID,
          survey_name: "Rada",
          $survey_response: data.mainGoal,
          $survey_response_1: data.mainGoal,
          $survey_response_2: data.budget,
          $survey_response_3: data.experience,
          $survey_response_4: data.role,
          $survey_response_5: data.email,
          $survey_response_6: data.frustrations?.join(", ") || "",
          // Also send as individual properties for easier analysis
          main_goal: data.mainGoal,
          budget: data.budget,
          experience: data.experience,
          role: data.role,
          email: data.email,
          frustrations: data.frustrations,
        });

        // Identify user by email
        if (data.email) {
          posthog.identify(data.email, {
            email: data.email,
            role: data.role,
            budget: data.budget,
            experience: data.experience,
          });
        }

        console.log("Survey submitted to PostHog:", data);
      }

      // Send confirmation email
      const emailResponse = await fetch("/api/send-survey-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          mainGoal: data.mainGoal,
          budget: data.budget,
          experience: data.experience,
          role: data.role,
        }),
      });

      if (!emailResponse.ok) {
        console.error("Failed to send confirmation email");
        // Don't block the user experience if email fails
        // Just log the error and continue
      }

      setIsComplete(true);
    } catch (err) {
      console.error("Error submitting survey:", err);
      setError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-2xl mx-auto">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-semibold mb-3">Thank you!</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We&rsquo;ve received your responses and sent a confirmation email to <strong>{data.email}</strong>.
              We&rsquo;ll prepare personalized AI tool recommendations and send them to you within 24-48 hours.
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                href="/"
                className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                Back to Home
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="btn-gradient px-6 py-3 rounded-xl text-white hover:opacity-90 transition"
              >
                Take Quiz Again
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6 md:p-8">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Question {step} of {totalSteps}</span>
              <span>{Math.round((step / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Content */}
          <div className="min-h-[300px]">
            {/* Step 1: Main Goal */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-semibold mb-2">What&rsquo;s your main goal or use case?</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Select the option that best describes what you want to achieve
                </p>
                <div className="space-y-3">
                  {[
                    "Marketing content creation",
                    "Writing / Copywriting",
                    "Coding / Development",
                    "Design / Visual assets",
                    "Productivity & Workflow Automation",
                    "Education / Learning",
                    "Audio & video editing",
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => setData({ ...data, mainGoal: option })}
                      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition ${
                        data.mainGoal === option
                          ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700"
                      }`}
                    >
                      <span className="font-medium">{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Budget */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-semibold mb-2">What&rsquo;s your budget?</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  We&rsquo;ll only recommend tools that fit your budget
                </p>
                <div className="space-y-3">
                  {[
                    { value: "Free — I only want free tools", label: "Free — I only want free tools" },
                    { value: "<$20 / month — Small solo budget", label: "<$20 / month — Small solo budget" },
                    { value: "$20–$100 / month — Willing to invest in tools", label: "$20–$100 / month — Willing to invest" },
                    { value: "$100+ / month — Professional or team plan", label: "$100+ / month — Professional or team" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setData({ ...data, budget: option.value })}
                      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition ${
                        data.budget === option.value
                          ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700"
                      }`}
                    >
                      <span className="font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Experience */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-semibold mb-2">What best describes your experience level with AI tools?</h2>
                <div className="space-y-3 mt-6">
                  {[
                    { value: "Beginner — I'm just exploring what's out there", label: "Beginner", desc: "I'm just exploring what's out there" },
                    { value: "Intermediate — I've used a few tools and know the basics", label: "Intermediate", desc: "I've used a few tools and know the basics" },
                    { value: "Advanced — I use AI tools regularly and want more power/customization", label: "Advanced", desc: "I use AI tools regularly and want more power" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setData({ ...data, experience: option.value })}
                      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition ${
                        data.experience === option.value
                          ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700"
                      }`}
                    >
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Role */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-semibold mb-2">Who are you?</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  This helps us tailor recommendations to your role
                </p>
                <div className="space-y-3">
                  {[
                    "Founder / Entrepreneur",
                    "Marketer / Growth professional",
                    "Developer / Engineer",
                    "Designer / Creative",
                    "Product Manager",
                    "Other",
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => setData({ ...data, role: option })}
                      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition ${
                        data.role === option
                          ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700"
                      }`}
                    >
                      <span className="font-medium">{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Email */}
            {step === 5 && (
              <div>
                <h2 className="text-2xl font-semibold mb-2">What&rsquo;s your email?</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  We&rsquo;ll send your personalized recommendations here. No spam, promise!
                </p>
                <input
                  type="email"
                  value={data.email || ""}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-violet-500 dark:focus:border-violet-500 outline-none transition bg-white dark:bg-neutral-800"
                  autoFocus
                />
              </div>
            )}

            {/* Step 6: Frustrations */}
            {step === 6 && (
              <div>
                <h2 className="text-2xl font-semibold mb-2">What&rsquo;s your biggest frustration when choosing tools?</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Select all that apply (optional)
                </p>
                <div className="space-y-3">
                  {[
                    "Too many options — I don't know which to pick",
                    "Can't tell if a tool is worth paying for",
                    "Hard to compare features",
                    "Most don't integrate with what I use",
                    "Pricing isn't transparent",
                  ].map((option) => {
                    const isSelected = data.frustrations?.includes(option) || false;
                    return (
                      <button
                        key={option}
                        onClick={() => {
                          const current = data.frustrations || [];
                          const updated = isSelected
                            ? current.filter((f) => f !== option)
                            : [...current, option];
                          setData({ ...data, frustrations: updated });
                        }}
                        className={`w-full text-left px-5 py-4 rounded-xl border-2 transition ${
                          isSelected
                            ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              isSelected
                                ? "border-violet-500 bg-violet-500"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                          >
                            {isSelected && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="font-medium">{option}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={isSubmitting}
              className="flex-1 btn-gradient px-6 py-3 rounded-xl text-white hover:opacity-90 disabled:opacity-50 transition font-medium"
            >
              {isSubmitting ? "Submitting..." : step === totalSteps ? "Submit" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
