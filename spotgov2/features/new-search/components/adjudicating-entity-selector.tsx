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
      ?.filter(
        (entity, index, self) =>
          // Ensure name is not null
          entity.name !== null &&
          // Ensure name is not undefined
          entity.name !== undefined &&
          // Remove duplicates
          self.findIndex((e) => e.name === entity.name) === index,
      )
      .map((entity) => ({
        value: entity.name as string,
        label: entity.name as string,
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
