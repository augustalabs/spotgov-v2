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
import AIIcon from "@/public/assets/ai-icon.svg";
import { ScrollText, WholeWord } from "lucide-react";
import { Button } from "@/components/ui/button";
import MultiSelect from "@/components/ui/multi-select";
import { useQuery } from "@tanstack/react-query";
import cpvsQuery from "@/queries/cpvs-query";

interface NewSearchCardProps {
  title: string;
}

const NewSearchCard: React.FC<NewSearchCardProps> = ({ title }) => {
  const { data: cpvs, error, isLoading } = useQuery(cpvsQuery());

  const handleCPVsChange = (
    selectedOptions: { value: string; label: string }[]
  ) => {
    console.log(selectedOptions);
  };

  return (
    <Card className="rounded-2xl w-full max-w-3xl border-[#2388FF]/30 bg-gradient-to-t from-[#2388FF]/10 to-white shadow-sm backdrop-blur-lg backdrop-filter">
      <CardHeader className="text-center">
        <CardTitle className="font-semibold text-xl">{title}</CardTitle>
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
          <Input placeholder="Pesquisar com AI..." />
        </div>
        <div className="mx-auto flex w-full items-center justify-between gap-2 bg-transparent text-sm">
          <div className="flex aspect-square h-12 w-12 items-center justify-center rounded-2xl border bg-[#F9F9FB] p-1">
            <WholeWord className="h-full w-full rounded-xl border bg-white p-2.5 text-gray-600" />
          </div>
          <Input placeholder="Pesquisar com Palavras-Chave..." />
        </div>
        <div className="mx-auto flex w-full items-center justify-between gap-2 bg-transparent text-sm">
          <div className="flex aspect-square h-12 w-12 items-center justify-center rounded-2xl border bg-[#F9F9FB] p-1">
            <ScrollText className="h-full w-full rounded-xl border bg-white p-2.5 text-gray-600" />
          </div>
          {/*
          <MultiSelect
            defaultOptions={cpvs?.map((cpv) => ({
              value: cpv,
              label: cpv,
            }))}
            placeholder="Pesquisar com CPVs..."
            variant="cpv"
            onChange={handleCPVsChange}
            creatable
          />
          */}
        </div>
        <Button>Pesquisar</Button>
      </CardContent>
    </Card>
  );
};

export default NewSearchCard;
