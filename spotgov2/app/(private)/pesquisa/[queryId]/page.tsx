"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QueryFilters from "@/features/queries/components/query-filters";
import QueryListView from "@/features/queries/components/query-views/query-list-view";
import QueryTableView from "@/features/queries/components/query-views/query-table-view";
import { useContracts } from "@/features/queries/hooks/use-contracts";
import { useFilters } from "@/features/queries/hooks/use-contract-filters";
import { KanbanSquare, Mail, Star, Table } from "lucide-react";
import { useParams } from "next/navigation";

export default function QueryPage() {
  let { queryId } = useParams();

  // queryId = queryId[0] if queryId is an array, otherwise queryId is a string
  queryId = (typeof queryId === "string" ? queryId : queryId?.[0]) || "";

  const { filters, setFilter } = useFilters();

  const { filteredContracts, uniqueIssuerNames, uniqueCPVs, isLoading } =
    useContracts({
      queryId,
      filters,
    });

  return (
    <div className="m-8">
      <Tabs defaultValue="list-view" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="list-view" className="gap-1.5">
              <KanbanSquare className="h-4 w-4 flex-shrink-0 text-secondary" />
              Feed
            </TabsTrigger>
            <TabsTrigger value="table-view" className="gap-1.5">
              <Table className="h-4 w-4 flex-shrink-0 text-secondary" />
              Tabela
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline">
              <Mail className="h-4 w-4 flex-shrink-0 text-secondary" />
              Alertas desativados
            </Button>
            <Button variant="outline">
              <Star className="h-4 w-4 flex-shrink-0 text-secondary" />
              Adicionar aos favoritos
            </Button>
          </div>
        </div>
        <QueryFilters
          filters={filters}
          setFilter={setFilter}
          adjudicatingEntitiesList={uniqueIssuerNames}
          cpvsList={uniqueCPVs}
        />
        <TabsContent value="list-view">
          <QueryListView filteredContracts={filteredContracts} />
        </TabsContent>
        <TabsContent value="table-view">
          <QueryTableView filteredContracts={filteredContracts} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
