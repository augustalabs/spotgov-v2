"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import googleIcon from "@public/assets/google.svg";
import useSupabase from "@/hooks/use-supabase";
import { useSearchParams } from "next/navigation";

const GoogleButton = ({ label }: { label: string }) => {
  const params = useSearchParams();
  const token = params.get("token") as string;

  const supabase = useSupabase();

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: token
          ? `${origin}/auth/callback?token=${token}`
          : `${origin}/auth/callback?`,
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
