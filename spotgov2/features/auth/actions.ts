"use server";

import { createClient } from "@/lib/supabase/server";
import * as z from "zod";
import { loginSchema } from "./schemas";
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

// export async function signUpWithPassword(formData: FormData) {
//   const supabase = await createClient();

//   const data: z.infer<typeof AuthSchema> = {
//     email: formData.get("email") as string,
//     password: formData.get("password") as string,
//   };

//   const { error } = await supabase.auth.signUp(data);

//   if (error) {
//     // TODO: handle error
//   }

//   revalidatePath("/", "layout");
//   redirect("/");
// }

export async function signOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/auth/login");
}
