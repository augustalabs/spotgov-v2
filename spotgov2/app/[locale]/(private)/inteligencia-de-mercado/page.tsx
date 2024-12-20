import Header from "@/components/header";
import { getTranslations } from "next-intl/server";

export default async function MarketIntelligencePage() {
  const headerTranslation = await getTranslations("marketIntelligence.header");

  return (
    <div>
      <Header title={headerTranslation("title")} />
    </div>
  );
}
