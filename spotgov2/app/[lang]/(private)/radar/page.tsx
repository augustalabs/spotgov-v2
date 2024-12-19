import Header from "@/components/header";
import CustomTable from "@/features/radar/components/custom-table";
import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

type Props = {
  params: { lang: Locale };
};

export default async function FavoriteSearchesPage({ params }: Props) {
  const { radar } = await getDictionary(params.lang);

  return (
    <section>
      <Header title={radar.header.title} />
      <CustomTable />
    </section>
  );
}
