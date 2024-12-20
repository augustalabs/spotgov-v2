"use client";

import { Toaster } from "sonner";
import ReactQueryProvider from "./react-query-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <ReactQueryProvider>
        <SidebarProvider>
          <Toaster />
          {children}
        </SidebarProvider>
      </ReactQueryProvider>
    </TooltipProvider>
  );
}
