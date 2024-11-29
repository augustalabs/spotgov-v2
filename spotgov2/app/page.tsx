"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const signOut = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <main>
      Hello World
      <div onClick={signOut}>sign out</div>
    </main>
  );
}
