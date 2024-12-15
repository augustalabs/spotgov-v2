"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPipelineData } from "../api/fetch-pipeline-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableView from "./table-view";
import KanbanView from "./kanban-view";
import TimelineView from "./timeline-view";
import { ChartNoAxesGantt, KanbanSquare, Table } from "lucide-react";
import Icon from "@/components/icon";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function Pipeline({ organizationId }: { organizationId: string }) {
  const { data: pipelineData } = useQuery({
    queryKey: ["pipeline", organizationId],
    queryFn: async () => await fetchPipelineData({ organizationId }),
    enabled: !!organizationId,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const phaseData = pipelineData
    ? pipelineData.reduce(
        (acc, item) => {
          const phaseName = item.pp.phaseName;
          const contract = {
            id: item.c.id,
            title: item.c.title || "",
            issuerName: item.c.issuerName || "",
            basePrice: item.c.basePrice || "",
            publishDate: item.c.publishDate
              ? new Date(item.c.publishDate).toISOString()
              : "",
            submissionDeadlineDate: item.c.submissionDeadlineDate
              ? new Date(item.c.submissionDeadlineDate).toISOString()
              : "",
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

  const filteredPhaseData = Object.fromEntries(
    Object.entries(phaseData).map(([phase, contracts]) => [
      phase,
      contracts.filter((contract) =>
        contract.title.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    ]),
  );

  const phaseNames = Object.keys(filteredPhaseData);

  return (
    <Tabs defaultValue="kanban-view" className="w-full">
      <Input
        className="my-10 w-[250px]"
        placeholder="Filtrar por título"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
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
          phaseData={filteredPhaseData}
          phaseNames={phaseNames}
        />
      </TabsContent>
      <TabsContent value="timeline-view">
        <TimelineView
          organizationId={organizationId}
          phaseData={filteredPhaseData}
          phaseNames={phaseNames}
        />
      </TabsContent>
    </Tabs>
  );
}

export default Pipeline;
