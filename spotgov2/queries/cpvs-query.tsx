import { getCPVs } from "@/features/new-search/actions";

function cpvsQuery() {
  const queryKey = ["cpvs"];

  const queryFn = async () => {
    const response = await getCPVs();
    return response;
  };

  return { queryKey, queryFn };
}

export default cpvsQuery;
