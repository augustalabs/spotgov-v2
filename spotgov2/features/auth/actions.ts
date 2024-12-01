"use server";

import { createClient } from "@/lib/supabase/server";
import * as z from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { loginSchema, signUpSchema } from "./schemas";

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
  redirect("/");
}

export async function signOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/auth/login");
}
