import ReactQueryProvider from "@/providers/react-query-provider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <main className="mx-auto flex h-full max-w-3xl items-center justify-center px-2">
        {children}
      </main>
    </ReactQueryProvider>
  );
}
