import NewSearchCard from "@/features/new-search/components/new-search-card";
import { createClient } from "@/lib/supabase/server";
import { getFirstName } from "@/lib/utils";

export default async function NewSearchPage() {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();

  const firstName = getFirstName(user.user?.user_metadata.full_name);

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Bom dia" : "Boa tarde";

  const title = `${greeting}${firstName ? `, ${firstName}` : ""}`;

  const cpvs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  return (
    <div className="p-4">
      <h1 className="font-medium text-xl">Nova Pesquisa</h1>
      <div className="flex flex-col items-center justify-start">
        <NewSearchCard title={title} cpvs={cpvs} />
      </div>
    </div>
  );
}
