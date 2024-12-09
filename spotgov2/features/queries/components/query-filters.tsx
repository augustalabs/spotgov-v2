"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderType, RelevanceType } from "@/types";

function QueryFilters({
  setOrder,
  setRelevance,
}: {
  setOrder: React.Dispatch<React.SetStateAction<OrderType>>;
  setRelevance: React.Dispatch<React.SetStateAction<RelevanceType>>;
}) {
  return (
    <>
      <Select
        defaultValue="all"
        onValueChange={(value) => setRelevance(value as RelevanceType)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="very-relevant">Muito relevante</SelectItem>
          <SelectItem value="relevant">Relevante</SelectItem>
        </SelectContent>
      </Select>

      <Select
        defaultValue="publish-date-desc"
        onValueChange={(value) => setOrder(value as OrderType)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="publish-date-desc">Mais recente</SelectItem>
          <SelectItem value="publish-date-asc">Mais antigo</SelectItem>
          <SelectItem value="base-price-desc">Preço mais alto</SelectItem>
          <SelectItem value="base-price-asc">Preço mais baixo</SelectItem>
          <SelectItem value="deadline-asc">Prazo mais próximo</SelectItem>
          <SelectItem value="deadline-desc">Prazo mais distante</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}

export default QueryFilters;
