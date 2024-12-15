"use client";

import { Input } from "@/components/ui/input";
import { useFavoriteQueriesFiltersStore } from "@/stores/favorite-queries-filters-store";
import { cn } from "@/utils/utils";
import { Search } from "lucide-react";

const SearchFilter = ({ className }: { className?: string }) => {
  const { searchTextInput, setSearchTextInput } =
    useFavoriteQueriesFiltersStore();

  return (
    <div className={cn("relative", className)}>
      <Search
        size={16}
        className="absolute left-1 top-1/2 -translate-y-1/2 text-border"
      />
      <Input
        placeholder="Procurar contratos..."
        value={searchTextInput}
        onChange={(event) => setSearchTextInput(event.target.value)}
        className="pl-6"
      />
    </div>
  );
};

export default SearchFilter;
