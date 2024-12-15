import { Lot } from "@/database/schemas";
import { Response } from "@/types";
import { get } from "@/utils/api/functions";

function contractLotsQuery(contractId: string) {
  const queryKey = ["get-contract-lots", contractId];

  const queryFn = async () =>
    await get<Response<Lot[]>>({
      url: `contracts/${contractId}/lots`,
    });

  const enabled = !!contractId;

  return { queryKey, queryFn, enabled };
}

export default contractLotsQuery;
