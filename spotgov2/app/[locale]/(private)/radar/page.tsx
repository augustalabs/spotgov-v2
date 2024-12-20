import Header from "@/components/header";
import CustomTable from "@/features/radar/components/custom-table";
import { getTranslations } from "next-intl/server";

export default async function FavoriteSearchesPage() {
  const radar = await getTranslations("radar");

  return (
    <section>
      <Header title={radar("header.title")} />
      <CustomTable />
    </section>
  );
}
