import CustomSidebar from "@/components/sidebar/custom-sidebar";
import Providers from "@/providers/providers";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <CustomSidebar />
      <div className="w-full overflow-x-hidden">
        <main className="mx-auto max-w-5xl px-2 py-3">{children}</main>
      </div>
    </Providers>
  );
}
