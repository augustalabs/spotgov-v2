"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import AIIcon from "/public/assets/icons/ai-icon.svg";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Option as MultiSelectOption } from "@/components/ui/multi-select";
import { addKeywords } from "../api";
import PriceRangeSelector from "./price-range-selector";
import { DateRange } from "react-day-picker";
import AdjudicatingEntitySelector from "./adjudicating-entity-selector";
import DateNewQuery from "./date-new-query";
import CPVSelector from "./cpv-selector";
import KeywordsSelector from "./keywords-selector";
import { format } from "date-fns";
import { buildQueryObject } from "@/utils/query";

interface NewSearchCardProps {
  title: string;
  organizationId: string;
}

const NewSearchCard: React.FC<NewSearchCardProps> = ({
  title,
  organizationId,
}) => {
  const [selectedAdjudicatingEntities, setSelectedAdjudicatingEntities] =
    useState<string[]>([]);

  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >();

  const [selectedPriceRange, setSelectedPriceRange] = useState<
    [number, number]
  >([0, 100000000]);

  const [newKeywords, setNewKeywords] = useState<string[]>([]);

  const addKeywordsMutation = useMutation({
    mutationFn: async (keywords: string[]) => {
      if (!organizationId) {
        throw new Error("Organization ID is required.");
      }
      return await addKeywords({ organizationId, keywords });
    },
    onError: (error) => {
      console.error("Error saving keywords:", error);
    },
  });

  const [aiSearchValue, setAiSearchValue] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState<MultiSelectOption[]>(
    [],
  );
  const [selectedCPVs, setSelectedCPVs] = useState<MultiSelectOption[]>([]);

  const handleSubmit = () => {
    // 1. Save the new keywords only outside development
    if (process.env.NODE_ENV === "development") {
      console.log(
        "\x1b[33m%s\x1b[0m",
        "Skipping keyword mutation in development.",
      );
    } else if (newKeywords.length > 0) {
      addKeywordsMutation.mutate(newKeywords);
    }

    // 2. Check if the user has enough credits
    /*
    const queryCurrency = userData?.info.queryCurrency ?? 0;

    if (queryCurrency <= 0) {
      toast.error("Sem créditos", {
        description:
          "Oops, parece que você não tem créditos suficientes para realizar mais pesquisas.",
      });
      setIsLoading(false);
      return;
    }
    */

    // 3.
    /* 
    if (
      !inputValue.trim() &&
      (!selectedCPVs || selectedCPVs.length === 0) &&
      (selectedKeywords.length === 0 || !selectedKeywords)
    ) {
      toast.error('Pesquisa vazia', {
        description:
          'Por favor, insira um termo de pesquisa ou selecione pelo menos um CPV.',
      });
      setIsLoading(false);
      return;
    }
      */

    // 4. Build query object
    const query = buildQueryObject({
      aiSearchValue,
      selectedCPVs,
      selectedKeywords,
      selectedAdjudicatingEntities,
      selectedPriceRange,
      selectedDateRange,
    });

    // 5. Add query to the database

    // 6. Submit the query

    window.location.href = "/pesquisa/8dcd1455-1951-4cc0-b1a1-5b2385ce120e";
  };

  return (
    <Card className="card-gradient w-full rounded-2xl shadow-sm backdrop-blur-lg backdrop-filter">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription>
          Pesquise por qualquer concurso público em Portugal.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="mx-auto flex w-full items-center justify-between gap-2 bg-transparent text-sm">
          <div className="flex aspect-square h-12 w-12 items-center justify-center rounded-2xl border bg-[#F9F9FB] p-1">
            <Image
              src={AIIcon}
              alt="AI Icon"
              className="h-full w-full rounded-xl border bg-white p-2.5"
              priority
            />
          </div>
          <Input
            placeholder="Pesquisar com AI..."
            value={aiSearchValue}
            onChange={(e) => setAiSearchValue(e.target.value)}
          />
        </div>
        <KeywordsSelector
          selectedKeywords={selectedKeywords}
          setSelectedKeywords={setSelectedKeywords}
          setNewKeywords={setNewKeywords}
          organizationId={organizationId}
        />
        <CPVSelector selectedCPVs={selectedCPVs} onChange={setSelectedCPVs} />
        <div className="flex items-center justify-center gap-2">
          <AdjudicatingEntitySelector
            setSelectedAdjudicatingEntities={setSelectedAdjudicatingEntities}
          />
          <PriceRangeSelector
            value={selectedPriceRange}
            onValueChange={setSelectedPriceRange}
          />
          <DateNewQuery
            selected={selectedDateRange}
            onSelect={setSelectedDateRange}
            className="flex-1"
          />
        </div>
        <Button onClick={handleSubmit}>Pesquisar</Button>
      </CardContent>
    </Card>
  );
};

export default NewSearchCard;
