import { getUserFromOrganization } from "@/features/organizations/api";
import { canInviteUser } from "@/permissions";
import { resend } from "@/lib/resend/client";
import { Response } from "@/types";
import { checkUserAuthentication } from "@/utils/api/helpers";
import {
  STATUS_BAD_REQUEST,
  STATUS_FORBIDDEN,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
} from "@/utils/api/status-messages";
import { generateInviteToken } from "@/utils/utils";
import { NextResponse } from "next/server";
import { ORGANIZATION_ACCEPT_INVITE_ROUTE } from "@/routes";

type Params = {
  organizationId: string;
};

export async function POST(
  req: Request,
  { params }: { params: Params },
): Promise<NextResponse<Response<string>>> {
  try {
    const userOrResponse = await checkUserAuthentication();
    if (userOrResponse instanceof NextResponse) return userOrResponse;

    const { organizationName, email } = await req.json();

    if (!organizationName || !email) {
      return NextResponse.json(STATUS_BAD_REQUEST, {
        status: STATUS_BAD_REQUEST.status,
      });
    }

    if (!params.organizationId) {
      return NextResponse.json(STATUS_BAD_REQUEST, {
        status: STATUS_BAD_REQUEST.status,
      });
    }

    const user = await getUserFromOrganization(
      userOrResponse.id,
      params.organizationId,
    );

    if (!user || !canInviteUser(user.role)) {
      return NextResponse.json(STATUS_FORBIDDEN, {
        status: STATUS_FORBIDDEN.status,
      });
    }

    const token = generateInviteToken(params.organizationId, email);

    if (!token) {
      return NextResponse.json(STATUS_NOT_FOUND, {
        status: STATUS_NOT_FOUND.status,
      });
    }

    const inviteUrl =
      process.env.NEXT_PUBLIC_BASE_URL! +
      ORGANIZATION_ACCEPT_INVITE_ROUTE.url +
      `/${token}`;

    // TODO: If we change token validity, we need to update the email template
    const sendEmail = await resend.emails.send({
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

    if (sendEmail.error) {
      return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR, {
        status: STATUS_INTERNAL_SERVER_ERROR.status,
      });
    }

    return NextResponse.json(
      { ...STATUS_OK, payload: inviteUrl },
      {
        status: STATUS_OK.status,
      },
    );
  } catch {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR, {
      status: STATUS_INTERNAL_SERVER_ERROR.status,
    });
  }
}
