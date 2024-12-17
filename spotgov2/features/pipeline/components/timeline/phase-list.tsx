import React from "react";
import { TimelineViewProps } from "../timeline-view";
import PhaseItem from "./phase-item";

interface PhaseListProps {
  phaseData: TimelineViewProps["phaseData"];
  phaseNames: TimelineViewProps["phaseNames"];
  timelineDayWidth: number;
}

const PhaseList: React.FC<PhaseListProps> = ({
  phaseData,
  phaseNames,
  timelineDayWidth,
}) => (
  <div className="space-y-6">
    {phaseNames.map((phaseName) => {
      const contracts = phaseData[phaseName];

      // Skip phases with no contracts
      if (!contracts || contracts.length === 0) return null;

      return (
        <PhaseItem
          key={phaseName}
          phaseName={phaseName}
          contracts={contracts}
          timelineDayWidth={timelineDayWidth}
        />
      );
    })}
  </div>
);

export default React.memo(PhaseList);
