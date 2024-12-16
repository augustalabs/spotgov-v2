import { createClient } from "@/lib/supabase/server";
import { contractsQuery, contractLotsQuery, contractTablesQuery } from "@/features/contracts/services"
import { notFound } from 'next/navigation';
import { useQuery } from "@tanstack/react-query";
import ContractCard from "@/features/queries/components/contract-card";
import ContractDetails from "@/features/contracts/components/contract-details";
import IssuerInfo from "@/features/contracts/components/contract-issuer-info";
import ContractFiles from "@/features/contracts/components/contract-files";
import ContractNotes from "@/features/contracts/components/contract-notes";
interface ContractPageProps {
  params: {
    contractId: string;
  };
}

export default async function ContractPage({ params }: ContractPageProps) {
  const { contractId } = params;
  const supabase = await createClient();
  const { data: user, error } = await supabase.auth.getUser();
  const isAuthenticated = !!user;

  // Fetch contract details
  const { data, isLoading: isLoadingContract } = useQuery(contractsQuery(contractId));

  if (!data || !data.payload) {
    notFound();
  }

  const contractData = data?.payload;
  const contractInOrganizationData = 'contracts_organizations' in data.payload 
    ? data.payload.contracts_organizations 
    : null;

  

  return (
    <div>
      <h1>Contract Details for ID: {contractId}</h1>
      {/* Render contract details */}
      <ContractCard
        title={contractData.title || ''}
        issuerName={contractData.issuerName || ''}
        submissionDeadlineDate={contractData.submissionDeadlineDate?.toString() || ''}
        basePrice={contractData.basePrice || ''}
        location={contractData.executionLocation || ''}
        publishDate={contractData.publishDate?.toString() || ''}
        
        
      />
      <h2>Details</h2>
      <ContractDetails contractId={contractId} linkDr={contractData.linkDr || ''} linkDelivery={contractData.linkDelivery || ''} summary={contractData.summary || ''} executionDeadlineDays={contractData.executionDeadlineDays || 0} maxLots={contractData.maxLots || 0} maxLotsPerContestant={contractData.maxLotsPerContestant || 0} awardCriteria={contractData.awardCriteria || {}} renews={contractData.renews || false} />
      {/* Render contractTables here */}
      
      <h2>Issuer</h2>
      <IssuerInfo reviewBodyInfo={contractData?.reviewBodyInfo || {}} issuerInfo={contractData?.issuerInfo || {}}/>
      
      <h2>Files</h2>
      <ContractFiles documents={contractData.documents || []} />

      {isAuthenticated && <><h2>Notes</h2>
      <ContractNotes comments={contractInOrganizationData?.comments || []} /></>}
      {/* Render contractLots here */}
    </div>
  );
}
