import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { addDays } from "date-fns";
import PhaseList from "./timeline/phase-list";
import Timeline from "./timeline/timeline";
import { useMemo } from "react";
import { getGroupedByMonth } from "../utils";
import { TIMELINE_DAY_GAP, TIMELINE_DAY_WIDTH } from "@/utils/constants";

export interface TimelineViewProps {
  organizationId: string;
  phaseData: Record<
    string,
    {
      title: string;
      basePrice: string;
      issuerName: string;
      publishDate: string;
      submissionDeadlineDate: string;
    }[]
  >;
  phaseNames: string[];
}

function TimelineView({ phaseData, phaseNames }: TimelineViewProps) {
  const today = useMemo(() => new Date(), []);
  const sixtyDaysLater = useMemo(() => addDays(today, 60), [today]);

  const groupedByMonth = useMemo(
    () => getGroupedByMonth(today, sixtyDaysLater),
    [today, sixtyDaysLater],
  );

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={35} minSize={20}>
        <PhaseList
          phaseData={phaseData}
          phaseNames={phaseNames}
          timelineDayWidth={TIMELINE_DAY_WIDTH}
        />
      </ResizablePanel>
      <ResizableHandle className="ml-4" />
      <ResizablePanel minSize={50}>
        <Timeline
          phaseData={phaseData}
          phaseNames={phaseNames}
          groupedByMonth={groupedByMonth}
          timelineDayWidth={TIMELINE_DAY_WIDTH}
          timelineDayGap={TIMELINE_DAY_GAP}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default TimelineView;
