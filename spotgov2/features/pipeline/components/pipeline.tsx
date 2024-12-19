"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPipelineData } from "../api/fetch-pipeline-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableView from "./table-view";
import KanbanView from "./kanban-view";
import TimelineView from "./timeline-view";
import {
  ChartNoAxesGantt,
  FileSpreadsheet,
  KanbanSquare,
  Search,
  SlidersHorizontal,
  Table,
} from "lucide-react";
import Icon from "@/components/icon";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { usePersistentTab } from "@/hooks/use-persitent-tab";
import { SAVED_CONTESTS_ROUTE } from "@/routes";

function Pipeline({ organizationId }: { organizationId: string }) {
  const { data: pipelineData } = useQuery({
    queryKey: ["pipeline", organizationId],
    queryFn: async () => await fetchPipelineData({ organizationId }),
    enabled: !!organizationId,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const { activeTab, handleTabChange } = usePersistentTab({
    defaultTab: "kanban-view",
    storageKey: "pipeline-tab",
  });

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
    <div className="m-5">
      <Header
        title={SAVED_CONTESTS_ROUTE.label}
        headerActions={
          <>
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-secondary" />
              <Input
                className="w-[250px] pl-9"
                placeholder="Procurar por título"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Icon IconComponent={SlidersHorizontal} />
              Filtros
            </Button>
            <Button variant="outline">
              <Icon IconComponent={FileSpreadsheet} />
              Exportar
            </Button>
          </>
        }
      />
      <Tabs
        value={activeTab ?? undefined}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="mb-5">
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
    </div>
  );
}

export default Pipeline;
