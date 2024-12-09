import { resend } from "@/lib/resend/client";
import { createClient } from "@/lib/supabase/server";
import { ORGANIZATION_INVITE_ROUTE } from "@/routes";
import { Response } from "@/types";
import {
  STATUS_BAD_REQUEST,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from "@/utils/api/status-messages";
import { generateInviteToken } from "@/utils/utils";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
): Promise<NextResponse<Response<string>>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR);

    if (!data?.user) return NextResponse.json(STATUS_UNAUTHORIZED);

    const { organizationId, organizationName, email } = await req.json();

    if (!organizationId || !organizationName || !email)
      return NextResponse.json(STATUS_BAD_REQUEST);

    const token = generateInviteToken(organizationId, email);

    const inviteUrl =
      process.env.NEXT_PUBLIC_BASE_URL! +
      ORGANIZATION_INVITE_ROUTE +
      `/${token}`;

    if (!inviteUrl) return NextResponse.json(STATUS_NOT_FOUND);

    // TODO: If we change token validity, we need to update the email template
    const a = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: `Foi convidado para se juntar à ${organizationName} no SpotGov.`,
      html: `
        <h1>Olá, </h1>
        <p>Foi convidado a juntar-se à organização ${organizationName} no SpotGov.</p>
        <p>Por favor, clique no link abaixo para aceitar o convite.</p>
        <a href="${inviteUrl}">${inviteUrl}</a>
        <p>O link é válido por 7 dias.</p>
      `,
    });

    return NextResponse.json({ ...STATUS_OK, payload: inviteUrl });
  } catch {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR);
  }
}
