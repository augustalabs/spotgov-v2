"use client";

import MultipleSelector, {
  Option as MultiSelectOption,
} from "@/components/ui/multi-select";
import { useQuery } from "@tanstack/react-query";
import { ScrollText } from "lucide-react";
import { getCPVs } from "../api/get-cpvs";
import { memo } from "react";

interface CPVSelectorProps {
  selectedCPVs: MultiSelectOption[];
  onChange: (values: MultiSelectOption[]) => void;
}

const CPVSelector = memo(function CPVSelector({
  selectedCPVs,
  onChange,
}: CPVSelectorProps) {
  const { data: cpvs } = useQuery({
    queryKey: ["cpvs"],
    queryFn: getCPVs,
    enabled: false,
  });

  // Process the CPVs data to create a list compatible with the MultiSelect component
  const cpvsList: MultiSelectOption[] =
    cpvs
      ?.filter((cpv: { fullName: string | null }) => cpv.fullName !== null)
      .map((cpv: { fullName: string | null }) => ({
        value: cpv.fullName as string,
        label: cpv.fullName as string,
      })) || [];

  return (
    <div className="mx-auto flex w-full items-center justify-between gap-2 bg-transparent text-sm">
      <div className="flex aspect-square h-12 w-12 items-center justify-center rounded-2xl border bg-[#F9F9FB] p-1">
        <ScrollText className="h-full w-full rounded-xl border bg-white p-2.5 text-gray-600" />
      </div>
      <MultipleSelector
        value={selectedCPVs}
        onChange={onChange}
        defaultOptions={cpvsList}
        creatable
        placeholder="Pesquisar com CPVs..."
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            Sem resultados.
          </p>
        }
        className="rounded-xl bg-white"
      />
    </div>
  );
});

export default CPVSelector;
