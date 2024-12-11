export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-3xl mx-auto px-2 flex justify-center items-center h-full">
      {children}
    </main>
  );
}
