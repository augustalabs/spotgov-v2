"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPipelineData } from "../api/fetch-pipeline-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableView from "./table-view";
import KanbanView from "./kanban-view";
import TimelineView from "./timeline-view";
import { ChartNoAxesGantt, KanbanSquare, Table } from "lucide-react";
import Icon from "@/components/icon";

function Pipeline({ organizationId }: { organizationId: string }) {
  const { data: pipelineData } = useQuery({
    queryKey: ["pipeline", organizationId],
    queryFn: async () => await fetchPipelineData({ organizationId }),
    enabled: !!organizationId,
  });

  // Group data by phaseName with contract details
  const phaseData = pipelineData
    ? pipelineData.reduce(
        (acc, item) => {
          const phaseName = item.pp.phaseName;
          const contract = {
            id: item.c.id,
            title: item.c.title,
            issuerName: item.c.issuerName,
            basePrice: item.c.basePrice,
            publishDate: item.c.publishDate,
            submissionDeadlineDate: item.c.submissionDeadlineDate,
          };

          if (!phaseName) return acc;

          if (!acc[phaseName]) {
            acc[phaseName] = [];
          }

          acc[phaseName].push(contract);

          return acc;
        },
        {} as Record<
          string,
          {
            id: string;
            title: string;
            issuerName: string;
            basePrice: string;
            publishDate: string;
            submissionDeadlineDate: string;
          }[]
        >,
      )
    : {};

  const phaseNames = Object.keys(phaseData);

  return (
    <Tabs defaultValue="kanban-view" className="w-full">
      <TabsList>
        <TabsTrigger value="kanban-view" className="gap-1.5">
          <Icon IconComponent={KanbanSquare} /> Fases
        </TabsTrigger>
        <TabsTrigger value="table-view" className="gap-1.5">
          <Icon IconComponent={Table} />
          Tabela
        </TabsTrigger>
        <TabsTrigger value="timeline-view" className="gap-1.5">
          <Icon IconComponent={ChartNoAxesGantt} />
          Linha Temporal
        </TabsTrigger>
      </TabsList>
      <TabsContent value="kanban-view">
        <KanbanView />
      </TabsContent>
      <TabsContent value="table-view">
        <TableView
          organizationId={organizationId}
          phaseData={phaseData}
          phaseNames={phaseNames}
        />
      </TabsContent>
      <TabsContent value="timeline-view">
        <TimelineView
          organizationId={organizationId}
          phaseData={phaseData}
          phaseNames={phaseNames}
        />
      </TabsContent>
    </Tabs>
  );
}

export default Pipeline;
