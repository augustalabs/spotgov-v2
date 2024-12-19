import Header from "@/components/header";
import CustomTable from "@/features/radar/components/custom-table";
import { SAVED_CONTESTS_ROUTE } from "@/routes";

export default function FavoriteSearchesPage() {
  return (
    <section>
      <Header title={SAVED_CONTESTS_ROUTE.label} />
      <CustomTable />
    </section>
  );
}
