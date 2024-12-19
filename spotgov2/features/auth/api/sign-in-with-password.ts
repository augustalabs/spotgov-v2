"use server";

import * as z from "zod";
import { loginSchema } from "../schemas";
import { createClient } from "@/lib/supabase/server";
import { HOME_ROUTE, ORGANIZATION_ACCEPT_INVITE_ROUTE } from "@/routes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function signInWithPassword(
  data: z.infer<typeof loginSchema>,
  token?: string,
) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw error;
  }

  revalidatePath(HOME_ROUTE.url, "layout");
  redirect(
    token ? `${ORGANIZATION_ACCEPT_INVITE_ROUTE.url}/${token}` : HOME_ROUTE.url,
  );
}

export default signInWithPassword;
