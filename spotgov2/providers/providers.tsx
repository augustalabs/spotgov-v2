"use client";

import { Toaster } from "sonner";
import ReactQueryProvider from "./react-query-provider";
import { UserProvider } from "./user-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <ReactQueryProvider>
        <Toaster />
        {children}
      </ReactQueryProvider>
    </UserProvider>
  );
}
