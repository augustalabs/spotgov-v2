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
import {
  Cat,
  Dog,
  Fish,
  Rabbit,
  ScrollText,
  Turtle,
  WholeWord,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import cpvsQuery from "@/queries/cpvs-query";
import { useState } from "react";
import MultipleSelector, { Option } from "@/components/ui/multi-select";

interface NewSearchCardProps {
  title: string;
}

const NewSearchCard: React.FC<NewSearchCardProps> = ({ title }) => {
  const { queryKey, fetchCPVs } = cpvsQuery();

  const { data: cpvs, error } = useQuery({ queryKey, queryFn: fetchCPVs });

  // Process the CPVs data to create a list compatible with the MultiSelect component
  const cpvsList = cpvs
    ?.filter((cpv: { fullName: string | null }) => cpv.fullName !== null)
    .map((cpv: { fullName: string | null }) => ({
      value: cpv.fullName as string,
      label: cpv.fullName as string,
    }));

  const OPTIONS: Option[] = [
    { label: "nextjs", value: "Nextjs" },
    { label: "React", value: "react" },
    { label: "Remix", value: "remix" },
    { label: "Vite", value: "vite" },
    { label: "Nuxt", value: "nuxt" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
    { label: "Angular", value: "angular" },
    { label: "Ember", value: "ember" },
    { label: "Gatsby", value: "gatsby" },
    { label: "Astro", value: "astro" },
  ];

  const [value, setValue] = useState<Option[]>([]);

  const handleCPVsChange = (
    selectedOptions: { value: string; label: string }[]
  ) => {
    console.log(selectedOptions);
  };

  return (
    <Card className="rounded-2xl w-full card-gradient shadow-sm backdrop-blur-lg backdrop-filter">
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
          <MultipleSelector
            value={value}
            onChange={setValue}
            defaultOptions={cpvsList}
            creatable
            placeholder="Pesquisar com CPVs..."
            emptyIndicator={
              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                Sem resultados.
              </p>
            }
            className="bg-white rounded-xl"
          />
        </div>
        <Button>Pesquisar</Button>
      </CardContent>
    </Card>
  );
};

export default NewSearchCard;
