import { Table } from "@/database/schemas";
import { Response } from "@/types";
import { get } from "@/utils/api/functions";

function contractTablesQuery(contractId: string) {
  const queryKey = ["get-contract-tables", contractId];

  const queryFn = async () =>
    await get<Response<Table[]>>({
      url: `contracts/${contractId}/tables`,
    });

  const enabled = !!contractId;

  return { queryKey, queryFn, enabled };
}

export default contractTablesQuery;
