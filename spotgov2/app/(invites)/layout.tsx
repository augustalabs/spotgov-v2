export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex h-full max-w-3xl items-center justify-center px-2">
      {children}
    </main>
  );
}
