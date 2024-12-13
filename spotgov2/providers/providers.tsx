"use client";

import { Toaster } from "sonner";
import ReactQueryProvider from "./react-query-provider";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <SidebarProvider>
        <Toaster />
        {children}
      </SidebarProvider>
    </ReactQueryProvider>
  );
}
