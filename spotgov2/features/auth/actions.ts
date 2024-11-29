"use server";

import { createClient } from "@/lib/supabase/server";
import * as z from "zod";
import { AuthSchema } from "./schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function signInWithPassword(formData: FormData) {
  const supabase = await createClient();

  const data: z.infer<typeof AuthSchema> = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    // TODO: handle error
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signUpWithPassword(formData: FormData) {
  const supabase = await createClient();

  const data: z.infer<typeof AuthSchema> = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    // TODO: handle error
  }

  revalidatePath("/", "layout");
  redirect("/");
}
