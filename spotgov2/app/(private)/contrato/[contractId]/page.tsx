import { createClient } from "@/lib/supabase/server";
import { contractsQuery, contractLotsQuery, contractTablesQuery } from "@/features/contracts/services"
import { notFound } from 'next/navigation';
import { useQuery } from "@tanstack/react-query";
interface ContractPageProps {
  params: {
    contractId: string;
  };
}

export default async function ContractPage({ params }: ContractPageProps) {
  const { contractId } = params;

  // Fetch contract details
  const { data: contract, isLoading: isLoadingContract } = useQuery(contractsQuery(contractId));
  
  // If contract not found, render 404 page
  if (!contract) {
    notFound();
  }
  
  // Proceed to fetch other related data
  const { data: contractTables, isLoading: isLoadingTables } = useQuery(contractTablesQuery(contractId));
  const { data: contractLots, isLoading: isLoadingLots } = useQuery(contractLotsQuery(contractId));

  return (
    <div>
      <h1>Contract Details for ID: {contractId}</h1>
      {/* Render contract details */}
      
      <h2>Tables</h2>
      {/* Render contractTables here */}
      
      <h2>Lots</h2>
      {/* Render contractLots here */}
    </div>
  );
}
