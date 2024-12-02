"use client";

import { Toaster } from "sonner";
import ReactQueryProvider from "./react-query-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <Toaster />
      {children}
    </ReactQueryProvider>
  );
}
