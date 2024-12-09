"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  formatDate2,
  getRemainingDaysColor,
  getRemainingDaysMessage,
} from "@/utils/utils";
import { differenceInDays } from "date-fns";
import { Share2 } from "lucide-react";

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
  matchTypeFull: boolean | null;
  reason: string;
}) {
  let parsedReason;

  try {
    parsedReason = reason ? JSON.parse(reason) : null;
  } catch (error) {
    parsedReason = null;
  }

  return (
    <div className="rounded-xl border p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold">{title}</div>
          <div>{issuerName}</div>
        </div>
        <div className="flex items-center justify-between gap-2">
          {parsedReason && Object.keys(parsedReason).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {Object.entries(parsedReason).map(([key, value]) => (
                <div key={key} className="rounded border p-2 text-sm">
                  {key}
                </div>
              ))}
            </div>
          )}
          <div>{matchTypeFull ? "Muito Relevante" : "Relevante"}</div>
          <Share2 className="h-4 w-4" />
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between gap-2">
          <Button>Analisar com AI</Button>
          <Button variant="outline">Guardar</Button>
          <div className="flex items-center gap-2">
            <div
              className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full ${getRemainingDaysColor(
                submissionDeadlineDate,
              )} bg-opacity-20`}
            >
              <div
                className={`h-2 w-2 rounded-full ${getRemainingDaysColor(
                  submissionDeadlineDate,
                )}`}
              ></div>
            </div>
            <div>{getRemainingDaysMessage(submissionDeadlineDate)}</div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div>{basePrice}</div>
          <div>{formatDate2(publishDate)}</div>
          <div>{location}</div>
          <div>{formatDate2(submissionDeadlineDate)}</div>
        </div>
      </div>
    </div>
  );
}

export default ContractCard;
