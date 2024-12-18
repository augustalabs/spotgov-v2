import React, { useMemo } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { addDays } from "date-fns";
import { determineCurrentPhase, PhaseEnum } from "../../utils";
import PhaseIndicator from "./phase-indicator";
import { TIMELINE_DAY_GAP, TIMELINE_DAY_WIDTH } from "@/utils/constants";
import { Landmark } from "lucide-react";
import Icon from "@/components/icon";

interface Contract {
  title: string;
  basePrice: string;
  issuerName: string;
  publishDate: string;
  submissionDeadlineDate: string;
}

interface ContractTimelineRowProps {
  contract: Contract;
}

const ContractTimelineRow: React.FC<ContractTimelineRowProps> = ({
  contract,
}) => {
  const publishDate = useMemo(
    () => new Date(contract.publishDate),
    [contract.publishDate],
  );
  const submissionDeadline = useMemo(
    () => new Date(contract.submissionDeadlineDate),
    [contract.submissionDeadlineDate],
  );
  const today = useMemo(() => new Date(), []);

  const currentPhase = useMemo(
    () => determineCurrentPhase(publishDate, submissionDeadline, today),
    [publishDate, submissionDeadline, today],
  );

  const totalDuration = useMemo(() => {
    return Math.floor(
      (submissionDeadline.getTime() - publishDate.getTime()) /
        (1000 * 60 * 60 * 24),
    );
  }, [publishDate, submissionDeadline]);

  const phaseLength = useMemo(() => totalDuration / 3, [totalDuration]);

  const phase1EndDate = useMemo(
    () => addDays(publishDate, Math.floor(phaseLength)),
    [publishDate, phaseLength],
  );
  const phase2EndDate = useMemo(
    () => addDays(publishDate, Math.floor(phaseLength * 2)),
    [publishDate, phaseLength],
  );

  const diffInDays = useMemo(
    () =>
      Math.floor(
        (submissionDeadline.getTime() - today.getTime()) /
          (1000 * 60 * 60 * 24),
      ),
    [submissionDeadline, today],
  );
  const diffToPhase1End = useMemo(
    () =>
      Math.floor(
        (phase1EndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      ),
    [phase1EndDate, today],
  );
  const diffToPhase2End = useMemo(
    () =>
      Math.floor(
        (phase2EndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      ),
    [phase2EndDate, today],
  );
  const diffFromPhase2ToDeadline = useMemo(
    () =>
      Math.floor(
        (submissionDeadline.getTime() - phase2EndDate.getTime()) /
          (1000 * 60 * 60 * 24),
      ),
    [submissionDeadline, phase2EndDate],
  );

  return (
    <TableRow className="border-transparent hover:bg-transparent">
      <TableCell className="nowrap relative truncate">
        {currentPhase === PhaseEnum.Expired ? (
          <div className="absolute left-0 top-1/2 z-10 mx-4 flex h-8 w-fit -translate-y-1/2 transform items-center justify-center text-xs opacity-50">
            Expirado
          </div>
        ) : (
          <PhaseIndicator
            currentPhase={currentPhase}
            diffInDays={diffInDays}
            diffToPhase1End={diffToPhase1End}
            diffToPhase2End={diffToPhase2End}
            diffFromPhase2ToDeadline={diffFromPhase2ToDeadline}
            timelineDayWidth={TIMELINE_DAY_WIDTH}
            timelineDayGap={TIMELINE_DAY_GAP}
          />
        )}
        <div className="flex flex-col items-start justify-center gap-1 opacity-0">
          <div className="font-medium">{contract.title}</div>
          <div className="flex items-center gap-1.5 text-xs text-secondary">
            <Icon IconComponent={Landmark} className="h-3 w-3" />
            {contract.issuerName}
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default React.memo(ContractTimelineRow);
