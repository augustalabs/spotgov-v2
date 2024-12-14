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
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
} from "date-fns";
import { ScrollText } from "lucide-react";

function TimelineView({
  organizationId,
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

  console.log(phaseData);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={35} minSize={20}>
        <div className="space-y-6">
          {phaseNames.map((phaseName) => (
            <div key={phaseName} className="mb-4">
              <h2 className="mb-2 truncate text-lg font-bold">{phaseName}</h2>
              <Table>
                <TableHeader>
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
                    <TableHead>
                      <div className="nowrap flex items-center gap-1.5 truncate">
                        Submission Deadline
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
                      <TableCell className="nowrap truncate">
                        {format(
                          new Date(contract.submissionDeadlineDate),
                          "dd/MM",
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel minSize={50}>
        <div className="space-y-6">
          {phaseNames.map((phaseName) => (
            <div key={phaseName} className="mb-4">
              <h2 className="mb-2 truncate text-lg font-bold">{phaseName}</h2>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>
                      <div className="nowrap flex items-center gap-1.5 truncate">
                        {allDays.map((day, index) => (
                          <div
                            key={index}
                            className="h-6 w-6 rounded border text-center"
                          >
                            {day}
                          </div>
                        ))}
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
                      (submissionDeadline - today) / (1000 * 60 * 60 * 24),
                    );

                    // Calculate the difference in days between publishDate and submissionDeadline
                    const publishToDeadlineDiff = Math.floor(
                      (submissionDeadline - publishDate) /
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
                      (phase1EndDate - today) / (1000 * 60 * 60 * 24),
                    );

                    // Calculate width for Phase 2
                    const phase2EndDate = new Date(publishDate);
                    phase2EndDate.setDate(phase2EndDate.getDate() + phase2);
                    const diffToPhase2End = Math.floor(
                      (phase2EndDate - today) / (1000 * 60 * 60 * 24),
                    );

                    // Calculate the width for the bar after Phase 2 (from end of Phase 2 to submission deadline)
                    const diffFromPhase2ToDeadline = Math.floor(
                      (submissionDeadline - phase2EndDate) /
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

                    console.log({
                      publishDate: publishDate,
                      submissionDeadline: submissionDeadline,
                      phase1: phase1,
                      phase2: phase2,
                      phase3: phase3,
                      currentPhase: currentPhase,
                      diffInDays: diffInDays,
                      phase1EndDate: phase1EndDate,
                      phase2EndDate: phase2EndDate,
                    });

                    return (
                      <TableRow key={index} className="hover:bg-transparent">
                        <TableCell className="nowrap relative truncate">
                          {diffInDays < 0 ? (
                            <div className="absolute left-0 top-1/2 z-10 mx-4 flex h-8 w-fit -translate-y-1/2 transform items-center justify-center opacity-50">
                              Expirado
                            </div>
                          ) : currentPhase === "Phase 3" ? (
                            <div
                              className="absolute left-0 top-1/2 z-10 mx-4 h-8 w-full -translate-y-1/2 transform rounded-full border border-blue-400/50 bg-blue-400/10 text-blue-400 opacity-50"
                              style={{
                                // 24px (w-6) is the width of each day, 6px (gap-1.5) is the gap between days
                                width: `${(diffInDays + 1) * 24 + (diffInDays + 1) * 6 - 6}px`,
                                transition: "width 0.5s ease-in-out",
                              }}
                            >
                              Phase 3
                            </div>
                          ) : currentPhase === "Phase 2" ? (
                            <div
                              className="absolute left-0 top-1/2 z-10 mx-4 h-8 w-full -translate-y-1/2 transform rounded-full bg-transparent opacity-50"
                              style={{
                                // 24px (w-6) is the width of each day, 6px (gap-1.5) is the gap between days
                                width: `${(diffInDays + 1) * 24 + (diffInDays + 1) * 6 - 6}px`,
                                transition: "width 0.5s ease-in-out",
                              }}
                            >
                              {/* Phase 2 */}
                              <div
                                className="absolute left-0 top-0 flex h-8 items-center justify-center rounded-full bg-green-400 text-white"
                                style={{
                                  width: `${(diffToPhase2End + 1) * 24 + (diffToPhase2End + 1) * 6 - 6}px`,
                                }}
                              >
                                Phase 2
                              </div>

                              {/* Phase 3 */}
                              <div
                                className="absolute top-0 flex h-8 items-center justify-center rounded-full bg-yellow-400 text-white"
                                style={{
                                  width: `${diffFromPhase2ToDeadline * 24 + diffFromPhase2ToDeadline * 6 - 6}px`,
                                  left: `${(diffToPhase2End + 1) * 24 + (diffToPhase2End + 1) * 6}px`,
                                }}
                              >
                                Phase 3
                              </div>
                            </div>
                          ) : currentPhase === "Phase 1" ? (
                            <div
                              className="absolute left-0 top-1/2 z-10 mx-4 h-8 w-full -translate-y-1/2 transform rounded-full border border-blue-400/50 bg-blue-400/10 text-blue-400 opacity-50"
                              style={{
                                // 24px (w-6) is the width of each day, 6px (gap-1.5) is the gap between days
                                width: `${(diffInDays + 1) * 24 + (diffInDays + 1) * 6 - 6}px`,
                                transition: "width 0.5s ease-in-out",
                              }}
                            >
                              Phase 1
                            </div>
                          ) : (
                            <div className="absolute left-0 top-1/2 z-10 mx-4 flex h-8 w-fit -translate-y-1/2 transform items-center justify-center opacity-50">
                              {currentPhase}
                            </div>
                          )}

                          <div className="opacity-0">
                            <div className="font-medium">{contract.title}</div>
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
          ))}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default TimelineView;
