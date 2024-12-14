<<<<<<< HEAD
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchPipelineData } from "@/features/pipeline/api/fetch-pipeline-data";
import Pipeline from "@/features/pipeline/components/pipeline";
import { getQueryClient } from "@/lib/react-query/client";
import { createClient } from "@/lib/supabase/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function PipelinePage() {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();

  // TODO: const organizationId = user.user?.user_metadata?.current_organization?.organizationId;
  const organizationId = "4ab0ebdd-dea7-4aad-9760-2a46343bef4c";

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["pipeline", organizationId],
    queryFn: async () => await fetchPipelineData({ organizationId }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Pipeline organizationId={organizationId} />
    </HydrationBoundary>
=======
import Header from "@/components/header";

export default function PipelinePage() {
  return (
    <div>
      <Header title="Pipeline" />
    </div>
>>>>>>> 60fdc2a0d04d30d98c3b6fdf6648b10ae26d2249
  );
}
