import Header from "@/components/header";
import CustomTable from "@/features/favorite-queries/components/custom-table";

export default function FavoriteSearchesPage() {
  return (
    <section>
      <Header title="Concursos guardados" />
      <CustomTable />
    </section>
  );
}
