import { NextResponse } from "next/server";
import React from "react";
import SurveyConfirmationEmail from "@/emails/SurveyConfirmation";

// Dynamic import to avoid build-time initialization
async function getResendClient() {
  const { Resend } = await import("resend");
  return new Resend(process.env.RESEND_API_KEY || "");
}

export async function POST(request: Request) {
  try {
    const { email, mainGoal, budget, experience, role } = await request.json();

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Send email using Resend with React component
    const resend = await getResendClient();
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Rada <onboarding@resend.dev>",
      to: [email],
      subject: "Your personalized AI tool recommendations are on the way",
      react: React.createElement(SurveyConfirmationEmail, {
        mainGoal,
        budget,
        experience,
        role,
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
