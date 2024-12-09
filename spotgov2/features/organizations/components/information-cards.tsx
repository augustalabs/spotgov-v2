"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import organizationUsersQuery from "@/queries/organization-users";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { useQuery } from "@tanstack/react-query";
import { LucideIcon, Search, Sparkles, Users } from "lucide-react";

type CardsInfoType = {
  icon: LucideIcon;
  label: string;
  value: number;
};

const InformationCards = () => {
  const { currentOrganization } = useCurrentOrganizationStore();

  const { data, isPending } = useQuery(
    organizationUsersQuery(currentOrganization?.organizationId as string)
  );

  const numberOfUsers = data?.payload?.length;
  const matchmakingCurrency =
    currentOrganization?.organization?.matchmakingCurrency;
  const deepDiveCurrency = currentOrganization?.organization?.deepDiveCurrency;

  const cardsInfo: CardsInfoType[] = [
    {
      icon: Users,
      label: "Membros",
      value: numberOfUsers as number,
    },
    {
      icon: Search,
      label: "Pesquisas restantes",
      value: matchmakingCurrency as number,
    },
    {
      icon: Sparkles,
      label: "Análises com AI restantes",
      value: deepDiveCurrency as number,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {cardsInfo.map((i) => (
        <Card key={i.label} className="w-full card-gradient">
          <CardHeader className="p-4">
            <CardDescription className="flex items-center justify-between">
              <p className="text-xs">{i.label}</p>
              <i.icon size={16} />
            </CardDescription>
            <CardTitle>
              {isPending ? (
                <Skeleton className="w-1/2 h-6" />
              ) : (
                <p>{i.value}</p>
              )}
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default InformationCards;
