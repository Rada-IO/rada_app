import { NextResponse } from "next/server";
import { Resend } from "resend";
import React from "react";
import SurveyConfirmationEmail from "@/emails/SurveyConfirmation";

// Initialize Resend lazily to avoid build-time errors
let resend: Resend;
function getResendClient() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY || "");
  }
  return resend;
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
    const { data, error } = await getResendClient().emails.send({
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
