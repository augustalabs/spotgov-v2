"use server";

import * as z from "zod";
import { signUpSchema } from "../schemas";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { HOME_ROUTE, ORGANIZATION_ACCEPT_INVITE_ROUTE } from "@/routes";
import { redirect } from "next/navigation";

async function signUpWithPassword(
  data: z.infer<typeof signUpSchema>,
  token?: string,
) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.name,
      },
    },
  });

  if (error) {
    throw error;
  }

  revalidatePath(HOME_ROUTE.url, "layout");
  redirect(
    token ? `${ORGANIZATION_ACCEPT_INVITE_ROUTE.url}/${token}` : HOME_ROUTE.url,
  );
}

export default signUpWithPassword;
