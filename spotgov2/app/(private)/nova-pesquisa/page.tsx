import NewSearchCard from "@/features/new-search/components/new-search-card";
import cpvsQuery from "@/queries/cpvs-query";
import { createClient } from "@/lib/supabase/server";
import { getFirstName } from "@/utils/utils";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function NewSearchPage() {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(cpvsQuery());

  const firstName = getFirstName(user.user?.user_metadata.full_name);

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Bom dia" : "Boa tarde";

  const title = `${greeting}${firstName ? `, ${firstName}` : ""}`;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-4 w-full flex flex-col items-center">
        <NewSearchCard title={title} />
      </div>
    </HydrationBoundary>
  );
}
