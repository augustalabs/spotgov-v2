import { createClient } from "@/lib/supabase/server";
import { getContractById, getContractLots, getContractTables } from "@/features/contracts/api"
import { notFound } from 'next/navigation';

interface ContractPageProps {
  params: {
    contractId: string;
  };
}

export default async function ContractPage({ params }: ContractPageProps) {
  const { contractId } = params;

  // Fetch contract details
  const contract = await getContractById({ contractId });
  
  // If contract not found, render 404 page
  if (!contract) {
    notFound();
  }
  
  // Proceed to fetch other related data
  const contractTables = await getContractTables({ contractId });
  const contractLots = await getContractLots({ contractId });

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
