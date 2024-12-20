import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import CustomSidebar from "@/components/sidebar/custom-sidebar";
import Providers from "@/providers/providers";

export default async function Layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    // <NextIntlClientProvider messages={messages}>
    <Providers>
      <CustomSidebar />
      <div className="w-full overflow-x-hidden">
        <main className="mx-auto max-w-5xl px-2 py-3">{children}</main>
      </div>
    </Providers>
    // </NextIntlClientProvider>
  );
}
