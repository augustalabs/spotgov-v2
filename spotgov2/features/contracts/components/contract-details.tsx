import { useQuery } from "@tanstack/react-query";
import { contractLotsQuery } from "../services";

export default function ContractDetails({ contractId, linkDr, linkDelivery, summary, executionDeadlineDays, maxLots, maxLotsPerContestant, awardCriteria, renews }:
  { contractId: string, linkDr: string, linkDelivery: string, summary: string, executionDeadlineDays: number, maxLots: number, maxLotsPerContestant: number, awardCriteria: any, renews: boolean }) {

  const { data: contractLots, isLoading: isLoadingLots } = useQuery(contractLotsQuery(contractId));
  const lots = contractLots?.payload;
    return (
      <div>
        <h1>Hello</h1> 
        <p>{linkDr}</p>
        <p>{linkDelivery}</p>
        <p>{summary}</p>
        <p>{executionDeadlineDays}</p>
        <p>{maxLots}</p>
        <p>{maxLotsPerContestant}</p>
        <p>{awardCriteria}</p>
        <p>{renews}</p>
        <p>{lots?.map((lot: any) => (
          <p>{lot.lotNumber}</p>
        ))}</p>
      </div>
    );
  }