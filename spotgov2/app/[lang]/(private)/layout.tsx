import CustomSidebar from "@/components/sidebar/custom-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const locale = params.lang;

  const { sidebar } = await getDictionary(locale);

  return (
    <TooltipProvider>
      <SidebarProvider>
        <CustomSidebar sidebar={sidebar} />
        <div className="w-full overflow-x-hidden">
          <main className="mx-auto max-w-5xl px-2 py-3">{children}</main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
