import React from "react";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { TimelineViewProps } from "../timeline-view";
import TimelineHeader from "./timeline-header";
import ContractTimelineRow from "./contract-timeline-row";

interface TimelineProps {
  phaseData: TimelineViewProps["phaseData"];
  phaseNames: TimelineViewProps["phaseNames"];
  groupedByMonth: Record<string, string[]>;
  timelineDayWidth: number;
  timelineDayGap: number;
}

const Timeline: React.FC<TimelineProps> = ({
  phaseData,
  phaseNames,
  groupedByMonth,
  timelineDayWidth,
  timelineDayGap,
}) => (
  <div className="space-y-6">
    {phaseNames.map((phaseName) => {
      const contracts = phaseData[phaseName];

      // Skip phases with no contracts
      if (!contracts || contracts.length === 0) return null;

      return (
        <div key={phaseName} className="mb-4">
          <Table
            wrapperClassName="rounded-none border-none"
            className="border-none"
          >
            <TableHeader>
              <TimelineHeader
                groupedByMonth={groupedByMonth}
                timelineDayWidth={timelineDayWidth}
                timelineDayGap={timelineDayGap}
              />
            </TableHeader>
            <TableBody>
              {contracts.map((contract, index) => (
                <ContractTimelineRow key={index} contract={contract} />
              ))}
            </TableBody>
          </Table>
        </div>
      );
    })}
  </div>
);

export default React.memo(Timeline);
