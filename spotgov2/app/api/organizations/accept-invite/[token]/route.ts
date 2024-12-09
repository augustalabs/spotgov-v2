import {
  STATUS_BAD_REQUEST,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
} from "@/utils/api/status-messages";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { doesUserExist } from "@/features/users/api";

type Params = {
  token: string;
};

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const { token } = params;

    if (!token) return NextResponse.json(STATUS_BAD_REQUEST);

    const tokenPayload = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_JWT_SECRET!
    ) as {
      organizationId: string;
      email: string;
    };

    if (!tokenPayload) return NextResponse.json(STATUS_NOT_FOUND);

    const userExists = await doesUserExist(tokenPayload.email);

    return NextResponse.json({
      ...STATUS_OK,
      payload: { ...tokenPayload, userExists },
    });
  } catch {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR);
  }
}
