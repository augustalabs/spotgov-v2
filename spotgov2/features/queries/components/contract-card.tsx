"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BadgeEuro,
  Bookmark,
  Calendar,
  ClockArrowUp,
  MapPin,
  Share2,
  Sparkles,
} from "lucide-react";
import { formatPrice } from "./query-views/query-table-view";
import {
  formatDate2,
  getRemainingDaysColor,
  getRemainingDaysMessage,
} from "@/utils/date";
import { BsStars } from "react-icons/bs";
import InfoItem from "./info-item";

function ContractCard({
  title,
  issuerName,
  submissionDeadlineDate,
  basePrice,
  location,
  publishDate,
  matchTypeFull,
  reason,
}: {
  title: string;
  issuerName: string;
  submissionDeadlineDate: string;
  basePrice: string;
  location: string;
  publishDate: string;
  matchTypeFull?: boolean | null;
  reason?: string | null;
}) {
  let parsedReason;

  try {
    parsedReason = reason ? JSON.parse(reason) : null;
  } catch (error) {
    parsedReason = null;
  }

  return (
    <div className="cursor-pointer rounded-xl border p-5 shadow-sm transition-colors hover:border-primary/50 hover:bg-primary/5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-sm text-muted-foreground">{issuerName}</div>
        </div>
        <div className="flex items-center justify-between gap-2">
          {parsedReason && Object.keys(parsedReason).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {Object.entries(parsedReason).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between gap-1.5 rounded-full border bg-gray-50 px-2.5 py-1 text-xs font-semibold shadow-sm"
                >
                  {key === "ai" && (
                    <Sparkles className="h-3 w-3 text-muted-foreground" />
                  )}
                  {key === "ai" ? "AI" : key}
                </div>
              ))}
            </div>
          )}
          <div
            className={`rounded-full border px-2.5 py-1 text-xs font-medium shadow-sm ${
              matchTypeFull
                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-500"
                : "border-yellow-500/50 bg-yellow-500/10 text-yellow-500"
            }`}
          >
            {matchTypeFull ? "Muito Relevante" : "Relevante"}
          </div>
          <Share2 className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between gap-2">
          <Button className="font-semibold" size="sm">
            <BsStars className="h-4 w-4" />
            Analisar com AI
          </Button>
          <Button variant="outline" size="sm">
            <Bookmark className="h-4 w-4 flex-shrink-0 text-secondary" />
            Guardar
          </Button>
          <div className="ml-4 flex items-center gap-2">
            <div
              className={`flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full ${getRemainingDaysColor(
                submissionDeadlineDate,
              )} bg-opacity-20`}
            >
              <div
                className={`h-1.5 w-1.5 rounded-full ${getRemainingDaysColor(
                  submissionDeadlineDate,
                )}`}
              ></div>
            </div>
            <div className="text-sm font-medium">
              {getRemainingDaysMessage(submissionDeadlineDate)}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-6">
          <InfoItem
            label="Preço Base"
            icon={
              <BadgeEuro className="h-4 w-4 flex-shrink-0 text-secondary" />
            }
            content={`${formatPrice(basePrice)}€`}
          />
          <InfoItem
            label="Localização"
            icon={<MapPin className="h-4 w-4 flex-shrink-0 text-secondary" />}
            content={location}
          />
          <InfoItem
            label="Data de Publicação"
            icon={<Calendar className="h-4 w-4 flex-shrink-0 text-secondary" />}
            content={formatDate2(publishDate)}
          />
          <InfoItem
            label="Data de Submissão"
            icon={
              <ClockArrowUp className="h-4 w-4 flex-shrink-0 text-secondary" />
            }
            content={formatDate2(submissionDeadlineDate)}
          />
        </div>
      </div>
    </div>
  );
}

export default ContractCard;
