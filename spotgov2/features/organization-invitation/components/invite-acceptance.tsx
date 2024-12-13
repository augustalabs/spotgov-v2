"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import {
  addUserMutation,
  acceptInviteQuery,
} from "@/features/organization-invitation/services";
import { LOGIN_ROUTE, NEW_SEARCH_ROUTE, SIGN_UP_ROUTE } from "@/routes";
import logo from "@public/assets/images/logo.png";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const InviteAcceptance = () => {
  const { token } = useParams();
  const router = useRouter();

  const { data, error, isPending } = useQuery(
    acceptInviteQuery(token as string),
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

        if (!authData.user) {
          router.push(`${LOGIN_ROUTE}?token=${token}`);
        }
      }
    }

    verifyToken();
  }, [isPending, error, data]);

  const mutation = useMutation(addUserMutation());

  const handleAcceptInvite = async () => {
    try {
      const res = await mutation.mutateAsync({
        organizationId: data?.payload?.organizationId as string,
        email: data?.payload?.email as string,
      });

      if (res.success) {
        toast.success("Convite aceite com sucesso!");
        router.push(NEW_SEARCH_ROUTE);
      } else {
        toast.error("Erro ao aceitar convite. Por favor, tente novamente.");
      }
    } catch {
      toast.error("Erro ao aceitar convite. Por favor, tente novamente.");
    }
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

export default InviteAcceptance;
