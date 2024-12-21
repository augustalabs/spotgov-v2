import React from "react";
import { Download, Hash, Scale, Type } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Document } from "@/types";

interface ContractFilesProps {
  documents: Document[];
}

export default function ContractFiles({ documents }: ContractFilesProps) {
  const sortedDocuments = documents.sort((a, b) => {
    const aPriority = a.isCadernoDeEncargos || a.isProgramaDoConcurso ? 1 : 0;
    const bPriority = b.isCadernoDeEncargos || b.isProgramaDoConcurso ? 1 : 0;

    return bPriority - aPriority;
  });

  return (
    <div className="mt-8">
      {/* TABLE HEADER */}
      <div className="grid grid-cols-4 bg-[#F7F8FA] p-3">
        <div className="col-span-2 flex items-center gap-1 text-sm">
          <Type size={16} color="#BAC0CC" />
          <p>Nome</p>
        </div>
        <div className="col-span-1 mx-auto flex items-center gap-1 text-sm">
          <Hash size={16} color="#BAC0CC" />
          <p>Formato</p>
        </div>
        <div className="col-span-1 mx-auto flex items-center gap-1 text-sm">
          <Hash size={16} color="#BAC0CC" />
          <p>Tamanho</p>
        </div>
      </div>

      {/* TABLE CONTENT */}
      <div className="scrollbar-thin max-h-[280px] overflow-auto">
        {sortedDocuments.length > 0 ? (
          sortedDocuments.map((document, index) => (
            <div key={index}>
              <div className="grid grid-cols-4 gap-2 p-3">
                <div className="col-span-2 flex items-center gap-2 text-sm">
                  <a
                    href={document.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#0078D4]"
                  >
                    <Download size={16} className="shrink-0" />
                    <p className="break-all">
                      {document.name.split(".").slice(0, -1).join(".")}
                    </p>
                  </a>
                  {(document.isCadernoDeEncargos ||
                    document.isProgramaDoConcurso) && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Scale size={16} className="shrink-0" />
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          {document.isCadernoDeEncargos
                            ? "Caderno de Encargos"
                            : "Programa do Concurso"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                <p className="col-span-1 mx-auto flex items-center text-sm">
                  {document.name.split(".").pop()?.toUpperCase()}
                </p>
                <p className="col-span-1 mx-auto flex items-center text-sm">
                  {document.size
                    ? (document.size * 0.000001).toFixed(3) + " MB"
                    : "n/d"}
                </p>
              </div>
              {index !== sortedDocuments.length - 1 && <Separator />}
            </div>
          ))
        ) : (
          <p className="p-3">Não há ficheiros disponíveis.</p>
        )}
      </div>
    </div>
  );
}
