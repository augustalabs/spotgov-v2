import { getCPVs } from "@/features/new-search/actions";

function cpvsQuery() {
  const queryKey = ["cpvs"];

  const fetchCPVs = async () => {
    const response = await getCPVs();
    return response;
  };

  return { queryKey, fetchCPVs };
}

export default cpvsQuery;
