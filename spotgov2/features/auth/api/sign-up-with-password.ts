"use server";

import * as z from "zod";
import { signUpSchema } from "../schemas";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { HOME_ROUTE, ORGANIZATION_INVITE_ROUTE } from "@/routes";
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
        is_super_admin: false,
      },
    },
  });

  if (error) {
    throw error;
  }

  revalidatePath(HOME_ROUTE, "layout");
  redirect(token ? `${ORGANIZATION_INVITE_ROUTE}/${token}` : HOME_ROUTE);
}

export default signUpWithPassword;
