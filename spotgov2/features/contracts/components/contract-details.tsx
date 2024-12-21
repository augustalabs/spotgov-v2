import React from "react";
import { getContractLots } from "../api";

import { Separator } from "@/components/ui/separator";
import {
  Clock,
  MoveUpRight,
  RefreshCcw,
  Scale,
  Package,
  FileText,
  DollarSign,
} from "lucide-react";
import { formatLink } from "../utils/utils";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ContractDetailsProps } from "@/types";

export default async function ContractDetails({
  contractId,
  linkDr,
  linkDelivery,
  summary,
  executionDeadlineDays,
  awardCriteria,
  renews,
  maxLots,
  maxLotsPerContestant,
}: ContractDetailsProps) {
  const lots = await getContractLots({ contractId });
  return (
    <div className="mt-8 space-y-4">
      {/* Summary */}
      <div className="space-y-2">
        <p className="text-sm text-[#B3B7C6]">Objeto do Contrato</p>
        <p className="text-sm">{summary}</p>
      </div>
      <Separator />
      {/* Links and Execution Details */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-sm text-[#B3B7C6]">Links Úteis</p>
          <div className="flex flex-wrap items-center gap-2">
            {linkDr && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-[1.5px] text-xs font-semibold"
              >
                <a
                  href={linkDr}
                  target="_blank"
                  className="flex items-center space-x-1"
                >
                  <span>{formatLink(linkDr)}</span>
                  <MoveUpRight size={16} />
                </a>
              </Button>
            )}
            {linkDelivery && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-[1.5px] text-xs font-semibold"
              >
                <a
                  href={linkDelivery}
                  target="_blank"
                  className="flex items-center space-x-1"
                >
                  <span>{formatLink(linkDelivery)}</span>
                  <MoveUpRight size={16} />
                </a>
              </Button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <p className="mb-2 text-sm text-[#B3B7C6]">Prazo de Execução</p>
            <div className="flex items-center">
              <Clock size={14} />
              <span className="ml-2 text-sm">{executionDeadlineDays} dias</span>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm text-[#B3B7C6]">Renovável</p>
            <div className="flex items-center">
              <RefreshCcw size={14} />
              <span className="ml-2 text-sm">{renews ? "Sim" : "Não"}</span>
            </div>
          </div>
        </div>
      </div>
      <Separator />
      {/* Award Criteria */}
      <p className="mb-2 text-sm text-[#B3B7C6]">Critérios de Adjudicação</p>
      {awardCriteria && awardCriteria.length > 0 ? (
        <div className="rounded-lg border border-[#E0E2E8] p-3">
          <Accordion type="multiple">
            {awardCriteria.map((criteria, index) => (
              <div key={index}>
                {criteria.Subfatores && criteria.Subfatores.length > 0 ? (
                  <AccordionItem value={criteria.Nome}>
                    <AccordionTrigger>
                      <div className="flex w-full items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <Scale size={16} />
                          <p className="text-[16px]">{criteria.Nome}</p>
                        </div>
                        <p className="text-[16px]">{criteria.Ponderação}</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-[#666F8D]">
                      {criteria.Subfatores.map((subfator, subIndex) => (
                        <div
                          key={subIndex}
                          className="flex items-center justify-between"
                        >
                          <p>{subfator.Nome}</p>
                          <p>{subfator.Ponderação.replaceAll(";", "")}</p>
                        </div>
                      ))}
                    </AccordionContent>
                    {index !== awardCriteria.length - 1 && (
                      <Separator className="my-3" />
                    )}
                  </AccordionItem>
                ) : (
                  <>
                    <div className="flex w-full items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Scale size={16} />
                        <p className="text-[16px]">{criteria.Nome}</p>
                      </div>
                      <p className="text-[16px]">{criteria.Ponderação}</p>
                    </div>
                    {index !== awardCriteria.length - 1 && (
                      <Separator className="my-3" />
                    )}
                  </>
                )}
              </div>
            ))}
          </Accordion>
        </div>
      ) : (
        <p>Não há critérios de adjudicação disponíveis.</p>
      )}
      <Separator />
      {/* Lots */}
      <p className="mb-2 text-sm text-[#B3B7C6]">Lotes</p>
      {lots && lots.length > 0 ? (
        <div className="rounded-lg border border-[#E0E2E8] p-3">
          <Accordion type="multiple">
            {lots.map((lot, index) => (
              <AccordionItem key={index} value={lot.lotNumber || ""}>
                <AccordionTrigger>
                  <div className="flex w-full items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Package size={16} />
                      <p className="text-[16px]">
                        Lote {lot.lotNumber} |{" "}
                        {lot.description?.substring(0, 30) || ""}
                      </p>
                    </div>
                    <p className="text-[16px]">{lot.basePrice}€</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2 text-[#666F8D]">
                  <div className="flex items-center">
                    <FileText size={14} />
                    <p className="ml-2">{lot.description}</p>
                  </div>
                  <div className="flex items-center">
                    <DollarSign size={14} />
                    <p className="ml-2">Preço Base: {lot.basePrice}</p>
                  </div>
                  <div className="flex items-center">
                    <FileText size={14} />
                    <p className="ml-2">CPVs: {lot.cpvs?.join(", ") || ""}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ) : (
        <p>Não há lotes disponíveis para este contrato.</p>
      )}
    </div>
  );
}
