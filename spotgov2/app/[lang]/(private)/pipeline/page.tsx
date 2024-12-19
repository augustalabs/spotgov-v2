import { fetchPipelineData } from "@/features/pipeline/api/fetch-pipeline-data";
import Pipeline from "@/features/pipeline/components/pipeline";
import { getQueryClient } from "@/lib/react-query/client";
import { createClient } from "@/lib/supabase/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export default async function PipelinePage() {
  const supabase = await createClient();

  // TODO: create a hook/util for this
  const { data: user, error: authError } = await supabase.auth.getUser();

  if (authError || !user?.user) {
    redirect("/login");
  }

  // TODO: const organizationId = user.user?.user_metadata?.current_organization?.organizationId;
  const organizationId = "fe16bbfb-226e-46a1-8d1d-de1524b2d898";

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["pipeline", organizationId],
    queryFn: async () => await fetchPipelineData({ organizationId }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Pipeline organizationId={organizationId} />
    </HydrationBoundary>
  );
}
