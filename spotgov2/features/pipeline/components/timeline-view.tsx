import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/features/queries/components/query-views/query-table-view";
import { addDays, eachDayOfInterval, format, getYear } from "date-fns";
import { Eye, Info, ScrollText, Send } from "lucide-react";
import { pt } from "date-fns/locale";

const TIMELINE_DAY_WIDTH = 28;
const TIMELINE_DAY_GAP = 6;

function TimelineView({
  phaseData,
  phaseNames,
}: {
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
}) {
  const today = new Date();
  const sixtyDaysLater = addDays(today, 60);

  const allDays = eachDayOfInterval({
    start: today,
    end: sixtyDaysLater,
  }).map((day) => format(day, "dd"));

  const allDays2 = eachDayOfInterval({
    start: today,
    end: sixtyDaysLater,
  });

  const groupedByMonth = allDays2.reduce<Record<string, string[]>>(
    (acc, day) => {
      const monthKey = `${format(day, "MMMM", { locale: pt })} ${getYear(day)}`;
      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }
      acc[monthKey].push(format(day, "dd"));
      return acc;
    },
    {},
  );

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={35} minSize={20}>
        <div className="space-y-6">
          {phaseNames.map((phaseName) => {
            const contracts = phaseData[phaseName];

            // Skip phases with no contracts
            if (!contracts || contracts.length === 0) return null;

            return (
              <div key={phaseName} className="mb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        colSpan={2}
                        className="text-left text-lg font-bold"
                      >
                        {phaseName}
                      </TableHead>
                    </TableRow>

                    <TableRow>
                      <TableHead>
                        <div className="nowrap flex items-center gap-1.5 truncate">
                          <ScrollText className="h-4 w-4 shrink-0" />
                          Concurso
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="nowrap flex items-center gap-1.5 truncate">
                          <ScrollText className="h-4 w-4 shrink-0" />
                          Preço Base
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {phaseData[phaseName]?.map((contract, index) => (
                      <TableRow key={index}>
                        <TableCell className="nowrap truncate">
                          <div>
                            <div className="font-medium">{contract.title}</div>
                            <div className="text-sm text-gray-500">
                              {contract.issuerName}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="nowrap truncate">
                          {formatPrice(contract.basePrice)}€
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            );
          })}
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel minSize={50}>
        <div className="space-y-6">
          {phaseNames.map((phaseName) => {
            const contracts = phaseData[phaseName];

            // Skip phases with no contracts
            if (!contracts || contracts.length === 0) return null;

            return (
              <div key={phaseName} className="mb-4">
                <Table>
                  <TableHeader>
                    {/* Month Row */}
                    <TableRow className="border-transparent hover:bg-transparent">
                      <TableHead
                        colSpan={Object.values(groupedByMonth).flat().length}
                      >
                        <div
                          className="flex"
                          style={{ gap: `${TIMELINE_DAY_GAP}px` }}
                        >
                          {Object.entries(groupedByMonth).map(
                            ([month, days], monthIndex) => (
                              <div
                                key={monthIndex}
                                className="flex items-center justify-center rounded-lg border text-center text-xs font-semibold"
                                style={{
                                  height: `${TIMELINE_DAY_WIDTH}px`,
                                  width: `${days.length * (TIMELINE_DAY_WIDTH + TIMELINE_DAY_GAP) - TIMELINE_DAY_GAP}px`,
                                }}
                              >
                                {month}
                              </div>
                            ),
                          )}
                        </div>
                      </TableHead>
                    </TableRow>

                    {/* Days Row */}
                    <TableRow className="border-transparent hover:bg-transparent">
                      <TableHead>
                        <div
                          className="flex"
                          style={{ gap: `${TIMELINE_DAY_GAP}px` }}
                        >
                          {Object.entries(groupedByMonth).map(
                            ([month, days], monthIndex) => (
                              <div
                                key={monthIndex}
                                className="flex"
                                style={{ gap: `${TIMELINE_DAY_GAP}px` }}
                              >
                                {days.map((day, dayIndex) => (
                                  <div
                                    key={`${month}-${dayIndex}`}
                                    className={`flex items-center justify-center rounded-lg border text-center text-xs`}
                                    style={{
                                      width: `${TIMELINE_DAY_WIDTH}px`,
                                      height: `${TIMELINE_DAY_WIDTH}px`,
                                    }}
                                  >
                                    {day}
                                  </div>
                                ))}
                              </div>
                            ),
                          )}
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {phaseData[phaseName]?.map((contract, index) => {
                      const publishDate = new Date(contract.publishDate);
                      const submissionDeadline = new Date(
                        contract.submissionDeadlineDate,
                      );
                      const today = new Date();

                      // Calculate the difference in days between the submission deadline and today
                      const diffInDays = Math.floor(
                        (submissionDeadline.getTime() - today.getTime()) /
                          (1000 * 60 * 60 * 24),
                      );

                      // Calculate the difference in days between publishDate and submissionDeadline
                      const publishToDeadlineDiff = Math.floor(
                        (submissionDeadline.getTime() - publishDate.getTime()) /
                          (1000 * 60 * 60 * 24),
                      );

                      // Divide the publishToDeadlineDiff into 3 phases
                      const phaseLength = publishToDeadlineDiff / 3;

                      // Calculate the phases
                      const phase1 = phaseLength;
                      const phase2 = phaseLength * 2;
                      const phase3 = publishToDeadlineDiff;

                      // Calculate the width for the bar from beginning to the end of Phase 1
                      const phase1EndDate = new Date(publishDate);
                      phase1EndDate.setDate(phase1EndDate.getDate() + phase1);
                      const diffToPhase1End = Math.floor(
                        (phase1EndDate.getTime() - today.getTime()) /
                          (1000 * 60 * 60 * 24),
                      );

                      // Calculate width for Phase 2
                      const phase2EndDate = new Date(publishDate);
                      phase2EndDate.setDate(phase2EndDate.getDate() + phase2);
                      const diffToPhase2End = Math.floor(
                        (phase2EndDate.getTime() - today.getTime()) /
                          (1000 * 60 * 60 * 24),
                      );

                      // Calculate the width for the bar after Phase 2 (from end of Phase 2 to submission deadline)
                      const diffFromPhase2ToDeadline = Math.floor(
                        (submissionDeadline.getTime() -
                          phase2EndDate.getTime()) /
                          (1000 * 60 * 60 * 24),
                      );

                      let currentPhase = "";
                      if (today < phase1EndDate) {
                        // Current date is before Phase 1 ends
                        currentPhase = "Phase 1";
                      } else if (today < phase2EndDate) {
                        // Current date is before Phase 2 ends
                        currentPhase = "Phase 2";
                      } else if (today <= submissionDeadline) {
                        // Current date is before or on the submission deadline
                        currentPhase = "Phase 3";
                      } else {
                        // Current date is past the submission deadline
                        currentPhase = "Expired";
                      }

                      return (
                        <TableRow key={index} className="hover:bg-transparent">
                          <TableCell className="nowrap relative truncate">
                            {diffInDays < 0 ? (
                              <div className="absolute left-0 top-1/2 z-10 mx-4 flex h-8 w-fit -translate-y-1/2 transform items-center justify-center text-xs opacity-50">
                                Expirado
                              </div>
                            ) : currentPhase === "Phase 3" ? (
                              <div
                                className="absolute left-0 top-1/2 z-10 mx-4 flex h-8 w-full -translate-y-1/2 transform items-center justify-between rounded-full border-b border-l border-t border-blue-400/50 bg-blue-400/10 pl-2 text-xs font-semibold text-blue-400"
                                style={{
                                  width: `${(diffInDays + 1) * TIMELINE_DAY_WIDTH + (diffInDays + 1) * TIMELINE_DAY_GAP - TIMELINE_DAY_GAP}px`,
                                  transition: "width 0.5s ease-in-out",
                                }}
                              >
                                <span className="truncate">Fase Final</span>
                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-400 bg-white">
                                  <Eye size={14} strokeWidth={2.5} />
                                </div>
                              </div>
                            ) : currentPhase === "Phase 2" ? (
                              <div
                                className="absolute left-0 top-1/2 z-10 mx-4 flex h-8 w-full -translate-y-1/2 transform items-center justify-between rounded-full"
                                style={{
                                  width: `${(diffInDays + 1) * TIMELINE_DAY_WIDTH + (diffInDays + 1) * TIMELINE_DAY_GAP - TIMELINE_DAY_GAP}px`,
                                  transition: "width 0.5s ease-in-out",
                                }}
                              >
                                {/* Phase 2 */}
                                <div
                                  className="absolute left-0 top-0 flex h-8 items-center justify-between rounded-full border-b border-l border-t border-orange-400/50 bg-orange-400/10 pl-2 text-xs font-semibold text-orange-400"
                                  style={{
                                    width: `${(diffToPhase2End + 1) * TIMELINE_DAY_WIDTH + (diffToPhase2End + 1) * TIMELINE_DAY_GAP - TIMELINE_DAY_GAP}px`,
                                  }}
                                >
                                  <span className="truncate">
                                    Resposta de Esclarecimentos, Erros e
                                    Omissões
                                  </span>
                                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-orange-400 bg-white">
                                    <Info size={14} strokeWidth={2.5} />
                                  </div>
                                </div>

                                {/* Phase 3 */}
                                <div
                                  className="absolute top-0 flex h-8 items-center justify-between rounded-full border-b border-l border-t border-blue-400/50 bg-blue-400/10 pl-2 text-xs font-semibold text-blue-400"
                                  style={{
                                    width: `${diffFromPhase2ToDeadline * TIMELINE_DAY_WIDTH + diffFromPhase2ToDeadline * TIMELINE_DAY_GAP - TIMELINE_DAY_GAP}px`,
                                    left: `${(diffToPhase2End + 1) * TIMELINE_DAY_WIDTH + (diffToPhase2End + 1) * TIMELINE_DAY_GAP}px`,
                                  }}
                                >
                                  <span className="truncate">Fase Final</span>
                                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-400 bg-white">
                                    <Eye size={14} strokeWidth={2.5} />
                                  </div>
                                </div>
                              </div>
                            ) : currentPhase === "Phase 1" ? (
                              <div
                                className="absolute left-0 top-1/2 z-10 mx-4 flex h-8 w-full -translate-y-1/2 transform items-center justify-between rounded-full"
                                style={{
                                  width: `${(diffInDays + 1) * TIMELINE_DAY_WIDTH + (diffInDays + 1) * TIMELINE_DAY_GAP - TIMELINE_DAY_GAP}px`,
                                  transition: "width 0.5s ease-in-out",
                                }}
                              >
                                {/* Phase 1 */}
                                <div
                                  className="absolute left-0 top-0 flex h-8 items-center justify-between rounded-full border-b border-l border-t border-green-400/50 bg-green-400/10 pl-2 text-xs font-semibold text-green-400"
                                  style={{
                                    width: `${(diffToPhase1End + 1) * TIMELINE_DAY_WIDTH + (diffToPhase1End + 1) * TIMELINE_DAY_GAP - TIMELINE_DAY_GAP}px`,
                                  }}
                                >
                                  <span className="truncate">
                                    Esclarecimentos, Erros e Omissões
                                  </span>
                                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-green-400 bg-white">
                                    <Send size={14} strokeWidth={2.5} />
                                  </div>
                                </div>

                                {/* Phase 2 */}
                                <div
                                  className="absolute left-0 top-0 flex h-8 items-center justify-between rounded-full border-b border-l border-t border-orange-400/50 bg-orange-400/10 pl-2 text-xs font-semibold text-orange-400"
                                  style={{
                                    width: `${(diffToPhase2End - diffToPhase1End) * TIMELINE_DAY_WIDTH + (diffToPhase2End - diffToPhase1End) * TIMELINE_DAY_GAP - TIMELINE_DAY_GAP}px`,
                                    left: `${(diffToPhase1End + 1) * TIMELINE_DAY_WIDTH + (diffToPhase1End + 1) * TIMELINE_DAY_GAP}px`,
                                  }}
                                >
                                  <span className="truncate">
                                    Resposta de Esclarecimentos, Erros e
                                    Omissões
                                  </span>
                                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-orange-400 bg-white">
                                    <Info size={14} strokeWidth={2.5} />
                                  </div>
                                </div>

                                {/* Phase 3 */}
                                <div
                                  className="absolute top-0 flex h-8 items-center justify-between rounded-full border-b border-l border-t border-blue-400/50 bg-blue-400/10 pl-2 text-xs font-semibold text-blue-400"
                                  style={{
                                    width: `${diffFromPhase2ToDeadline * TIMELINE_DAY_WIDTH + diffFromPhase2ToDeadline * TIMELINE_DAY_GAP - TIMELINE_DAY_GAP}px`,
                                    left: `${(diffToPhase2End + 1) * TIMELINE_DAY_WIDTH + (diffToPhase2End + 1) * TIMELINE_DAY_GAP}px`,
                                  }}
                                >
                                  <span className="truncate">Fase Final</span>
                                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-400 bg-white">
                                    <Eye size={14} strokeWidth={2.5} />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="absolute left-0 top-1/2 z-10 mx-4 flex h-8 w-fit -translate-y-1/2 transform items-center justify-center opacity-50">
                                {currentPhase}
                              </div>
                            )}

                            <div className="opacity-0">
                              <div className="font-medium">
                                {contract.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {contract.issuerName}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            );
          })}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default TimelineView;
