import { OrderType } from "@/types";
import { create } from "zustand";

type FavoriteQueriesFiltersStoreProps = {
  // Search for contracts by title or issuer name
  searchTextInput: string;
  setSearchTextInput: (value: string) => void;
  // Search for contracts by adjudicators
  adjudicatorsDefaultValues: string[];
  setAdjudicatorsDefaultValues: (value: string[]) => void;
  adjudicatorsInput: string[];
  setAdjudicatorsInput: (value: string[]) => void;
  // Search for contracts by query title
  queryTitlesInput: string[];
  setQueryTitlesInput: (value: string[]) => void;
  queryTitlesDefaultValues: string[];
  setQueryTitlesDefaultValues: (value: string[]) => void;
  // Search for contracts by saved status
  savedInput: boolean | null;
  setSavedInput: (value: boolean | null) => void;
  // Search for contracts by cpvs
  cpvsInput: string[];
  setCpvsInput: (value: string[]) => void;
  cpvsDefaultValues: string[];
  setCpvsDefaultValues: (value: string[]) => void;
  // Search for contracts by base price
  basePriceInput: number[];
  setBasePriceInput: (value: number[]) => void;
  basePriceDefaultValues: number[];
  setBasePriceDefaultValues: (value: number[]) => void;
  // Sort contracts by newest, oldest, highest price, lowest price, nearest deadline, farthest deadline
  selectedSortInput: OrderType;
  setSelectedSortInput: (value: OrderType) => void;
};

export const useFavoriteQueriesFiltersStore =
  create<FavoriteQueriesFiltersStoreProps>((set) => ({
    searchTextInput: "",
    setSearchTextInput: (value) => set({ searchTextInput: value }),
    adjudicatorsDefaultValues: [],
    setAdjudicatorsDefaultValues: (value) =>
      set({ adjudicatorsDefaultValues: value }),
    adjudicatorsInput: [],
    setAdjudicatorsInput: (value) => set({ adjudicatorsInput: value }),
    queryTitlesInput: [],
    setQueryTitlesInput: (value) => set({ queryTitlesInput: value }),
    queryTitlesDefaultValues: [],
    setQueryTitlesDefaultValues: (value) =>
      set({ queryTitlesDefaultValues: value }),
    savedInput: null,
    setSavedInput: (value) => set({ savedInput: value }),
    cpvsInput: [],
    setCpvsInput: (value) => set({ cpvsInput: value }),
    cpvsDefaultValues: [],
    basePriceInput: [0, 0],
    setBasePriceInput: (value) => set({ basePriceInput: value }),
    basePriceDefaultValues: [0, 0],
    setBasePriceDefaultValues: (value) =>
      set({ basePriceDefaultValues: value }),
    setCpvsDefaultValues: (value) => set({ cpvsDefaultValues: value }),
    selectedSortInput: "publish-date-desc",
    setSelectedSortInput: (value) => set({ selectedSortInput: value }),
  }));