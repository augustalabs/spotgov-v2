"use client";

import { createClient } from "@/lib/supabase/client";

export default function Home() {
  const signOut = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();
  };

  return (
    <main>
      Hello World
      <div onClick={signOut}>sign out</div>
    </main>
  );
}
