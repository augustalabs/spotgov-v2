"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getQueryById } from "@/features/queries/api/get-query";
import { getQueryContracts } from "@/features/queries/api/get-query-contracts";
import QueryFilters from "@/features/queries/components/query-filters";
import QueryListView from "@/features/queries/components/query-views/query-list-view";
import QueryTableView from "@/features/queries/components/query-views/query-table-view";
import { OrderType, PriceRange, RelevanceType } from "@/types";
import { filterAndSortContracts } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { KanbanSquare, Mail, Star, Table } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function QueryPage() {
  let { queryId } = useParams();

  // queryId = queryId[0] if queryId is an array, otherwise queryId is a string
  queryId = (typeof queryId === "string" ? queryId : queryId?.[0]) || "";

  // Filters
  const [relevance, setRelevance] = useState<RelevanceType>("all");
  const [order, setOrder] = useState<OrderType>("publish-date-desc");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [priceRange, setPriceRange] = useState<PriceRange>([0, 100000000]);
  const [selectedAdjudicatingEntities, setSelectedAdjudicatingEntities] =
    useState<string[]>([]);
  const [selectedCPVs, setSelectedCPVs] = useState<string[]>([]);

  // Fetch query
  const { data: query } = useQuery({
    queryKey: ["query", queryId],
    queryFn: async () => await getQueryById({ queryId }),
    enabled: !!queryId,
  });

  // TODO (?): Create getQueriesContracts and pass queryId directly from params

  // Fetch contracts for the query
  const { data: contracts } = useQuery({
    queryKey: ["contracts", queryId],
    queryFn: async () => await getQueryContracts({ queryId }),
    enabled: !!queryId,
  });

  // Filtered (and sorted) contracts
  const filteredContracts = contracts
    ? filterAndSortContracts(contracts, {
        relevance,
        dateRange,
        priceRange,
        selectedAdjudicatingEntities,
        selectedCPVs,
        order,
      })
    : [];

  // Extract unique issuer names
  const uniqueIssuerNames = contracts
    ? Array.from(
        new Set(
          contracts.map((contract) => contract.issuerName).filter(Boolean),
        ),
      )
    : [];

  // Extract unique CPVs
  const uniqueCPVs = contracts
    ? Array.from(
        new Set(contracts.flatMap((contract) => contract.cpvs).filter(Boolean)),
      )
    : [];

  return (
    <div className="m-10">
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
          setOrder={setOrder}
          setRelevance={setRelevance}
          setDateRange={setDateRange}
          setPriceRange={setPriceRange}
          adjudicatingEntitiesList={uniqueIssuerNames}
          setSelectedAdjudicatingEntities={setSelectedAdjudicatingEntities}
          cpvsList={uniqueCPVs}
          setSelectedCPVs={setSelectedCPVs}
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
