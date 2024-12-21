import { createClient } from "@/lib/supabase/server";
import { resend } from "@/lib/resend/client";
import { NextResponse } from "next/server";
import {
  STATUS_BAD_REQUEST,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_OK,
} from "@/utils/api/status-messages";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(STATUS_BAD_REQUEST, {
        status: STATUS_BAD_REQUEST.status,
      });
    }

    // Generate password reset link using Supabase
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password`,
    });

    if (error) {
      throw error;
    }

    /* Send email using Resend
    const sendEmail = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Password Recovery - SpotGov",
      html: `
        <h1>Password Recovery</h1>
        <p>A password recovery was requested for your SpotGov account.</p>
        <p>Click the link below to reset your password:</p>
        <p>If you didn't request this change, you can safely ignore this email.</p>
      `,
    });

    if (sendEmail.error) {
      throw sendEmail.error;
    } */

    return NextResponse.json(STATUS_OK, {
      status: STATUS_OK.status,
    });
  } catch (error) {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR, {
      status: STATUS_INTERNAL_SERVER_ERROR.status,
    });
  }
}
