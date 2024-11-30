"use server";

import { createClient } from "@/lib/supabase/server";
import * as z from "zod";
import { loginSchema, signUpSchema } from "./schemas";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function signInWithPassword(data: z.infer<typeof loginSchema>) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw error;
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signUpWithPassword(data: z.infer<typeof signUpSchema>) {
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

  revalidatePath("/", "layout");
  redirect("/criar-organizacao");
}

export async function signOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/auth/login");
}
