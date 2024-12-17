import React from "react";
import { Eye, Info, Send } from "lucide-react";
import { PhaseEnum } from "../../utils";

interface PhaseIndicatorProps {
  currentPhase: PhaseEnum;
  diffInDays: number;
  diffToPhase1End: number;
  diffToPhase2End: number;
  diffFromPhase2ToDeadline: number;
  timelineDayWidth: number;
  timelineDayGap: number;
}

const PhaseIndicator: React.FC<PhaseIndicatorProps> = ({
  currentPhase,
  diffInDays,
  diffToPhase1End,
  diffToPhase2End,
  diffFromPhase2ToDeadline,
  timelineDayWidth,
  timelineDayGap,
}) => {
  switch (currentPhase) {
    case PhaseEnum.Phase1:
      return (
        <PhaseOneIndicator
          diffToPhase1End={diffToPhase1End}
          timelineDayWidth={timelineDayWidth}
          timelineDayGap={timelineDayGap}
        />
      );
    case PhaseEnum.Phase2:
      return (
        <PhaseTwoIndicator
          diffToPhase2End={diffToPhase2End}
          diffFromPhase2ToDeadline={diffFromPhase2ToDeadline}
          timelineDayWidth={timelineDayWidth}
          timelineDayGap={timelineDayGap}
        />
      );
    case PhaseEnum.Phase3:
      return (
        <PhaseThreeIndicator
          diffInDays={diffInDays}
          timelineDayWidth={timelineDayWidth}
          timelineDayGap={timelineDayGap}
        />
      );
    default:
      return null;
  }
};

interface PhaseOneIndicatorProps {
  diffToPhase1End: number;
  timelineDayWidth: number;
  timelineDayGap: number;
}

const PhaseOneIndicator: React.FC<PhaseOneIndicatorProps> = ({
  diffToPhase1End,
  timelineDayWidth,
  timelineDayGap,
}) => {
  if (diffToPhase1End === 0) {
    return (
      <div className="absolute left-0 top-1/2 z-10 mx-4 flex h-8 w-fit -translate-y-1/2 transform items-center justify-center">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-green-400 bg-white text-green-400">
          <Send size={14} strokeWidth={2.5} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute left-0 top-1/2 z-10 mx-4 flex h-8 w-full -translate-y-1/2 transform items-center justify-between rounded-full"
      style={{
        width: `${(diffToPhase1End + 1) * timelineDayWidth + (diffToPhase1End + 1) * timelineDayGap - timelineDayGap}px`,
        transition: "width 0.5s ease-in-out",
      }}
    >
      <span className="truncate">Esclarecimentos, Erros e Omissões</span>
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-green-400 bg-white">
        <Send size={14} strokeWidth={2.5} />
      </div>
    </div>
  );
};

interface PhaseTwoIndicatorProps {
  diffToPhase2End: number;
  diffFromPhase2ToDeadline: number;
  timelineDayWidth: number;
  timelineDayGap: number;
}

const PhaseTwoIndicator: React.FC<PhaseTwoIndicatorProps> = ({
  diffToPhase2End,
  diffFromPhase2ToDeadline,
  timelineDayWidth,
  timelineDayGap,
}) => (
  <div
    className="absolute left-0 top-1/2 z-10 mx-4 flex h-8 w-full -translate-y-1/2 transform items-center justify-between rounded-full"
    style={{
      width: `${(diffToPhase2End + 1) * timelineDayWidth + (diffToPhase2End + 1) * timelineDayGap - timelineDayGap}px`,
      transition: "width 0.5s ease-in-out",
    }}
  >
    {/* Phase 2 */}
    {diffToPhase2End === 0 ? (
      <div className="absolute left-0 top-1/2 z-10 flex h-8 w-fit -translate-y-1/2 transform items-center justify-center">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-orange-400 bg-white text-orange-400">
          <Info size={14} strokeWidth={2.5} />
        </div>
      </div>
    ) : (
      <div
        className="absolute left-0 top-0 flex h-8 items-center justify-between rounded-full border-b border-l border-t border-orange-400/50 bg-orange-400/10 pl-2 text-xs font-semibold text-orange-400"
        style={{
          width: `${(diffToPhase2End + 1) * timelineDayWidth + (diffToPhase2End + 1) * timelineDayGap - timelineDayGap}px`,
        }}
      >
        <span className="truncate">
          Resposta de Esclarecimentos, Erros e Omissões
        </span>
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-orange-400 bg-white">
          <Info size={14} strokeWidth={2.5} />
        </div>
      </div>
    )}

    {/* Phase 3 */}
    <div
      className="absolute top-0 flex h-8 items-center justify-between rounded-full border-b border-l border-t border-blue-400/50 bg-blue-400/10 pl-2 text-xs font-semibold text-blue-400"
      style={{
        width: `${diffFromPhase2ToDeadline * timelineDayWidth + diffFromPhase2ToDeadline * timelineDayGap - timelineDayGap}px`,
        left: `${(diffToPhase2End + 1) * timelineDayWidth + (diffToPhase2End + 1) * timelineDayGap}px`,
      }}
    >
      <span className="truncate">Fase Final</span>
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-400 bg-white">
        <Eye size={14} strokeWidth={2.5} />
      </div>
    </div>
  </div>
);

interface PhaseThreeIndicatorProps {
  diffInDays: number;
  timelineDayWidth: number;
  timelineDayGap: number;
}

const PhaseThreeIndicator: React.FC<PhaseThreeIndicatorProps> = ({
  diffInDays,
  timelineDayWidth,
  timelineDayGap,
}) => {
  if (diffInDays === 0) {
    return (
      <div className="absolute left-0 top-1/2 z-10 mx-4 flex h-8 w-fit -translate-y-1/2 transform items-center justify-center">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-400 bg-white text-blue-400">
          <Eye size={14} strokeWidth={2.5} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute left-0 top-1/2 z-10 mx-4 flex h-8 w-full -translate-y-1/2 transform items-center justify-between rounded-full border-b border-l border-t border-blue-400/50 bg-blue-400/10 pl-2 text-xs font-semibold text-blue-400"
      style={{
        width: `${(diffInDays + 1) * timelineDayWidth + (diffInDays + 1) * timelineDayGap - timelineDayGap}px`,
        transition: "width 0.5s ease-in-out",
      }}
    >
      <span className="truncate">Fase Final</span>
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-400 bg-white">
        <Eye size={14} strokeWidth={2.5} />
      </div>
    </div>
  );
};

export default React.memo(PhaseIndicator);
