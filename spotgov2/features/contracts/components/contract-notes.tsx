"use client";

import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import updateNotesMutation from "../services/update-notes-mutation";
import { useDebounceCallback } from "usehooks-ts";
import { Loader2, Check, X } from "lucide-react";

interface ContractNotesProps {
  contractId: string;
  organizationId: string;
  comments: string;
}

export default function ContractNotes({
  contractId,
  organizationId,
  comments,
}: ContractNotesProps) {
  const [value, setValue] = React.useState(comments);
  const [showStatus, setShowStatus] = React.useState(false);
  const {
    mutate: updateNotes,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    ...updateNotesMutation(contractId, organizationId, value),
    onSettled: () => {
      setShowStatus(true);
      setTimeout(() => {
        setShowStatus(false);
      }, 1000);
    },
  });

  const debouncedUpdateNotes = useDebounceCallback(updateNotes, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedUpdateNotes();
  };

  return (
    <div className="mt-8 space-y-2">
      <div className="relative">
        <Textarea
          value={value}
          onChange={handleChange}
          placeholder="No comments available."
          className={`custom-scrollbar h-40 resize-none transition-opacity ${
            isPending ? "opacity-50" : "opacity-100"
          }`}
        />
        <div className="absolute bottom-2 right-3">
          {isPending && (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          )}
          {isSuccess && showStatus && (
            <Check className="h-4 w-4 text-green-500 duration-300 animate-in fade-in-0" />
          )}
          {isError && showStatus && (
            <X className="h-4 w-4 text-red-500 duration-300 animate-in fade-in-0" />
          )}
        </div>
      </div>
    </div>
  );
}
