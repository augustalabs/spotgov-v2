import { NextResponse } from "next/server";

import { getAllUsers } from "@/features/internal-dashboard/api";
import {  Response } from "@/types";
import {
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
} from "@/utils/api/status-messages";
import { checkUserAuthentication } from "@/utils/api/helpers";
import { User } from "@/database/schemas/users";

export async function GET(): Promise<
  NextResponse<Response<User[]>>
> {
  try {
    const userOrResponse = await checkUserAuthentication();
    if (userOrResponse instanceof NextResponse) return userOrResponse;

    const users = await getAllUsers();

    if (!users?.length) {
      return NextResponse.json(STATUS_NOT_FOUND, {
        status: STATUS_NOT_FOUND.status,
      });
    }

    return NextResponse.json(
      { ...STATUS_OK, payload: users },
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