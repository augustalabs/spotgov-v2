import NewSearchCard from "@/features/new-search/components/new-search-card";
import { createClient } from "@/lib/supabase/server";
import { getFirstName } from "@/utils/utils";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {
  getCpvs,
  getAdjudicatingEntities,
  getKeywords,
} from "@/features/new-search/api";
import PreviousSearches from "@/features/new-search/components/previous-searches";

export default async function NewSearchPage() {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["cpvs"],
    queryFn: async () => {
      return await getCpvs();
    },
  });

  const organizationId =
    user.user?.user_metadata?.current_organization?.organizationId;

  await queryClient.prefetchQuery({
    queryKey: ["keywords", organizationId],
    queryFn: async () => await getKeywords({ organizationId }),
  });

  await queryClient.prefetchQuery({
    queryKey: ["adjudicatingEntities"],
    queryFn: async () => await getAdjudicatingEntities(),
  });

  const firstName = getFirstName(user.user?.user_metadata.full_name);

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Bom dia" : "Boa tarde";

  const title = `${greeting}${firstName ? `, ${firstName}` : ""}`;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center p-4">
        <NewSearchCard title={title} organizationId={organizationId} />
        <PreviousSearches organizationId={organizationId} />
      </div>
    </HydrationBoundary>
  );
}
