"use client";

import { formatTimeAgo } from "@/utils/date-utils";
import { Clock, Star } from "lucide-react";

function SearchCard({ title = "", starred = false, createdAt = "" }) {
  console.log(createdAt);

  return (
    <div className="flex w-full items-center justify-between rounded-xl border p-2">
      <div className="flex items-center justify-between gap-2">
        <Star className="h-4 w-4" fill={starred ? "#999" : "transparent"} />
        {title}
      </div>
      <div className="flex items-center justify-between gap-2">
        <Clock className="h-4 w-4" />
        <span>{formatTimeAgo(createdAt)}</span>
      </div>
    </div>
  );
}

export default SearchCard;
