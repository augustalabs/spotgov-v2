"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { HOME_ROUTE, LOGIN_ROUTE } from "@/routes";

async function signOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  revalidatePath(HOME_ROUTE, "layout");
  redirect(LOGIN_ROUTE);
}

export default signOut;
