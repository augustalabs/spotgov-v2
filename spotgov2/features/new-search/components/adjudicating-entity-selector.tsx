import { VirtualizedCombobox } from "@/components/ui/virtualized-combobox";
import { useQuery } from "@tanstack/react-query";
import React, { memo, useCallback } from "react";
import { getAdjudicatingEntities } from "../api";
import { Landmark } from "lucide-react";

interface AdjudicatingEntitySelectorProps {
  setSelectedAdjudicatingEntities: (value: string[]) => void;
}

const AdjudicatingEntitySelector = memo(function AdjudicatingEntitySelector({
  setSelectedAdjudicatingEntities,
}: AdjudicatingEntitySelectorProps) {
  // Fetch adjudicating entities
  const { data: adjudicatingEntities } = useQuery({
    queryKey: ["adjudicatingEntities"],
    queryFn: getAdjudicatingEntities,
  });

  const adjudicatingEntitiesList =
    adjudicatingEntities
      // Filter to remove duplicates based on the "name" property
      ?.filter(
        (entity, index, self) =>
          self.findIndex((e) => e.name === entity.name) === index,
      )
      .map((entity) => ({
        value: entity.name,
        label: entity.name,
      })) || [];

  const handleSelectedAdjudicatingEntitiesChange = useCallback(
    (values: string[]) => {
      setSelectedAdjudicatingEntities(values);
    },
    [setSelectedAdjudicatingEntities],
  );

  return (
    <VirtualizedCombobox
      items={adjudicatingEntitiesList}
      label={
        <div className="flex items-center">
          <Landmark className="mr-2 text-secondary" />
          <span>Adjudicante</span>
        </div>
      }
      emptyLabel="Sem resultados."
      popover={{ width: "400px", align: "center" }}
      onSelectedChange={handleSelectedAdjudicatingEntitiesChange}
    />
  );
});

export default AdjudicatingEntitySelector;
