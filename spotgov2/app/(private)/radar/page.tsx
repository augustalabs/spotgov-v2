import Header from "@/components/header";
import CustomTable from "@/features/radar/components/custom-table";
import { CONTESTS_RADAR_ROUTE } from "@/routes";

export default function FavoriteSearchesPage() {
  return (
    <section>
      <Header title={CONTESTS_RADAR_ROUTE.label} />
      <CustomTable />
    </section>
  );
}
