import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import {
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_UNAUTHORIZED,
} from "./status-messages";

export async function checkUserAuthentication() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR, {
      status: STATUS_INTERNAL_SERVER_ERROR.status,
    });
  }

  if (!data?.user) {
    return NextResponse.json(STATUS_UNAUTHORIZED, {
      status: STATUS_UNAUTHORIZED.status,
    });
  }

  return data.user;
}
