import React from 'react';
import { Textarea } from "@/components/ui/textarea";

interface ContractNotesProps {
  comments: string;
}

export default function ContractNotes({ comments }: ContractNotesProps) {
  return (
    <div className="space-y-2 mt-8">
      <Textarea
        value={comments}
        readOnly
        placeholder="No comments available."
        className="resize-none h-40"
      />
    </div>
  );
}

