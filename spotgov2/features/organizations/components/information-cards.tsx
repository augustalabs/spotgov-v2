"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { organizationUsersQuery } from "@/features/organizations/services";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { useQuery } from "@tanstack/react-query";
import { LucideIcon, Search, Sparkles, Users } from "lucide-react";
import { useTranslations } from "next-intl";

type CardsInfoType = {
  icon: LucideIcon;
  label: string;
  value: number;
};

const InformationCards = () => {
  const cardsTranslation = useTranslations("organization.cards");

  const { currentOrganization } = useCurrentOrganizationStore();

  const { data, isPending } = useQuery(
    organizationUsersQuery(currentOrganization?.organizationId as string),
  );

  const numberOfUsers = data?.payload?.length;
  const matchmakingCurrency =
    currentOrganization?.organization?.matchmakingCurrency;
  const deepDiveCurrency = currentOrganization?.organization?.deepDiveCurrency;

  const cardsInfo: CardsInfoType[] = [
    {
      icon: Users,
      label: cardsTranslation("members"),
      value: numberOfUsers as number,
    },
    {
      icon: Search,
      label: cardsTranslation("querysLeft"),
      value: matchmakingCurrency as number,
    },
    {
      icon: Sparkles,
      label: cardsTranslation("analysis"),
      value: deepDiveCurrency as number,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {cardsInfo.map((i) => (
        <Card key={i.label} className="card-gradient w-full">
          <CardHeader className="p-4">
            <CardDescription className="flex items-center justify-between">
              <p className="text-xs">{i.label}</p>
              <i.icon size={16} />
            </CardDescription>
            <CardTitle>
              {isPending ? (
                <Skeleton className="h-6 w-1/2" />
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
