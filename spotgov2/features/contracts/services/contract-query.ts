import { Contract } from "@/database/schemas";
import { Response } from "@/types";
import { get } from "@/utils/api/functions";

function contractQuery(contractId: string) {
  const queryKey = ["get-contract", contractId];

  const queryFn = async () =>
    await get<Response<Contract[]>>({
      url: `contracts/${contractId}`,
    });

  const enabled = !!contractId;

  return { queryKey, queryFn, enabled };
}

export default contractQuery;
