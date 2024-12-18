import { Contract } from "@/database/schemas";
import { JoinedContractInOrganization, Response } from "@/types";
import { get, getServer } from "@/utils/api/functions";
import { getContractById } from "../api";
import { getContractInOrganization } from "../api";

function contractQuery(contractId: string) {
  const queryKey = ["get-contract", contractId];

  const queryFn = async () =>
    await get<Response<JoinedContractInOrganization | Contract | null>>({
      url: `contracts/${contractId}`,
    });

  const enabled = !!contractId;

  return { queryKey, queryFn, enabled };
}

export default contractQuery;


export async function contractsQueryFn(contractId: string): Promise<Response<JoinedContractInOrganization | Contract | null>> {
  return await getServer<Response<JoinedContractInOrganization | Contract | null>>({
    url: `contracts/${contractId}`,
  });
}

