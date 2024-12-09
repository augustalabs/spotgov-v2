"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import addUserMutation from "@/mutations/add-user-mutation";
import acceptInviteQuery from "@/queries/accept-invite-query";
import { LOGIN_ROUTE, NEW_SEARCH_ROUTE, SIGN_UP_ROUTE } from "@/routes";
import logo from "@public/assets/logo.png";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const Wrapper = () => {
  const { token } = useParams();
  const router = useRouter();

  const { data, error, isPending } = useQuery(
    acceptInviteQuery(token as string)
  );

  useEffect(() => {
    async function verifyToken() {
      if (error) return;

      if (!isPending) {
        if (!data.payload?.userExists) {
          router.push(`${SIGN_UP_ROUTE}?token=${token}`);
        }

        const supabase = createClient();
        const { data: authData } = await supabase.auth.getUser();

        if (!authData) {
          router.push(`${LOGIN_ROUTE}?token=${token}`);
        }
      }
    }

    verifyToken();
  }, [isPending, error, data]);

  const mutation = useMutation(addUserMutation());

  const handleAcceptInvite = () => {
    try {
      mutation.mutate({
        organizationId: data?.payload?.organizationId as string,
        email: data?.payload?.email as string,
      });

      router.push(NEW_SEARCH_ROUTE);
    } catch {}
  };

  return (
    <div className="space-y-4">
      <Image alt="SpotGov Logo" src={logo} width={145} />
      <Button variant="outline" onClick={handleAcceptInvite}>
        Aceitar convite
      </Button>
    </div>
  );
};

export default Wrapper;
