"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import googleIcon from "@public/assets/google.svg";

const GoogleButton = ({ label }: { label: string }) => {
  const handleGoogleSignIn = async () => {
    const supabase = await createClient();

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
  };

  return (
    <Button onClick={handleGoogleSignIn} variant="outline" className="w-full">
      <Image alt="Google Icon" src={googleIcon} width={18} />
      {label}
    </Button>
  );
};

export default GoogleButton;
