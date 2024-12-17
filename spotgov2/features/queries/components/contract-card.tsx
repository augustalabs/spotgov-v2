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
    <div className="relative">
      <div className="cursor-pointer rounded-2xl border bg-white p-4 text-black shadow-lg transition-colors hover:border-primary/50 hover:bg-primary/5 lg:p-6">
        <div className="flex flex-col space-y-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{issuerName}</p>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 md:mt-0 md:flex-nowrap">
              {parsedReason && Object.keys(parsedReason).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {Object.entries(parsedReason).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center gap-1.5 rounded-full border bg-gray-50 px-2.5 py-1 text-xs font-semibold shadow-sm"
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

          <Separator />

          {/* Actions and Indicators */}
          <div className="flex flex-col items-start space-y-2 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            {/* Action Buttons */}
            <div className="flex w-full flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0 sm:w-fit">
              <Button
                className="rounded-xl max-h-8 w-full sm:w-auto font-semibold"
                size="sm"
              >
                <BsStars className="h-4 w-4" />
                Analisar com AI
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl max-h-8 w-full sm:w-auto"
              >
                <Bookmark className="h-4 w-4 flex-shrink-0 text-secondary" />
                Guardar
              </Button>
              {/* Remaining Days Indicator */}
              <div className="mt-2 flex items-center space-x-1 sm:mt-0">
                <div
                  className={`relative flex items-center justify-center rounded-full ${getRemainingDaysColor(
                    submissionDeadlineDate,
                  )} bg-opacity-20 h-4 w-4`}
                >
                  <div
                    className={`absolute h-2 w-2 rounded-full ${getRemainingDaysColor(
                      submissionDeadlineDate,
                    )}`}
                  ></div>
                </div>
                <p className="text-xs font-medium">
                  {getRemainingDaysMessage(submissionDeadlineDate)}
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-row sm:space-x-4">
              <InfoItem
                label="Preço Base"
                icon={
                  <BadgeEuro className="h-4 w-4 flex-shrink-0 text-secondary" />
                }
                content={`${formatPrice(basePrice)}€`}
              />
              <InfoItem
                label="Localização"
                icon={
                  <MapPin className="h-4 w-4 flex-shrink-0 text-secondary" />
                }
                content={location}
              />
              <InfoItem
                label="Data de Publicação"
                icon={
                  <Calendar className="h-4 w-4 flex-shrink-0 text-secondary" />
                }
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
      </div>
    </div>
  );
}

export default ContractCard;
