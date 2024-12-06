import CustomSidebar from "@/components/sidebar/custom-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <CustomSidebar />
      <div className="w-full">
        <SidebarTrigger />
        <main className="max-w-3xl mx-auto px-2">{children}</main>
      </div>
    </SidebarProvider>
  );
}
