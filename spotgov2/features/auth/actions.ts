"use server";

import { createClient } from "@/lib/supabase/server";
import * as z from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { loginSchema, signUpSchema } from "./schemas";
import { HOME_ROUTE, LOGIN_ROUTE, ORGANIZATION_INVITE_ROUTE } from "@/routes";

export async function signInWithPassword(
  data: z.infer<typeof loginSchema>,
  token?: string
) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw error;
  }

  revalidatePath(HOME_ROUTE, "layout");
  redirect(token ? `${ORGANIZATION_INVITE_ROUTE}/${token}` : HOME_ROUTE);
}

export async function signUpWithPassword(
  data: z.infer<typeof signUpSchema>,
  token?: string
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

  revalidatePath(HOME_ROUTE, "layout");
  redirect(token ? `${ORGANIZATION_INVITE_ROUTE}/${token}` : HOME_ROUTE);
}

export async function signOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  revalidatePath(HOME_ROUTE, "layout");
  redirect(LOGIN_ROUTE);
}
