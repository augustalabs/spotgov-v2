"use client";

import { Input } from "@/components/ui/input";
import { useFavoriteQueriesFiltersStore } from "@/stores/favorite-queries-filters-store";
import { cn } from "@/utils/utils";
import { debounce } from "@tanstack/react-virtual";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const SearchFilter = ({ className }: { className?: string }) => {
  const { setSearchTextInput } = useFavoriteQueriesFiltersStore();

  const [localSearchTextInput, setLocalSearchTextInput] = useState("");

  const debouncedSetSearchTextInput = useMemo(
    () =>
      typeof window !== "undefined"
        ? debounce(window, setSearchTextInput, 500)
        : () => {},
    [setSearchTextInput],
  );

  useEffect(() => {
    debouncedSetSearchTextInput(localSearchTextInput);
  }, [localSearchTextInput, debouncedSetSearchTextInput]);

  return (
    <div className={cn("relative", className)}>
      <Search
        size={16}
        className="absolute left-1 top-1/2 -translate-y-1/2 text-border"
      />
      <Input
        placeholder="Procurar contratos..."
        value={localSearchTextInput}
        onChange={(event) => setLocalSearchTextInput(event.target.value)}
        className="pl-6"
      />
    </div>
  );
};

export default SearchFilter;
