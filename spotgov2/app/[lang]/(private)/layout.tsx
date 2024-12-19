import CustomSidebar from "@/components/sidebar/custom-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <CustomSidebar />
        <div className="w-full overflow-x-hidden">
          <main className="mx-auto max-w-5xl px-2 py-3">{children}</main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
