import { createClient } from "@/lib/supabase/server";
import { getContractById, getContractInOrganization, createContractInOrganization } from "@/features/contracts/api"; // Direct imports
import { notFound } from 'next/navigation';
import ContractCard from "@/features/queries/components/contract-card";
import ContractDetails from "@/features/contracts/components/contract-details";
import ContractIssuerInfo from "@/features/contracts/components/contract-issuer-info";
import ContractFiles from "@/features/contracts/components/contract-files";
import ContractNotes from "@/features/contracts/components/contract-notes";
import { getContractPageData } from "@/features/contracts/api/get-contract-page-data";

interface ContractPageProps {
  params: {
    contractId: string;
  };
}

export default async function ContractPage({ params }: ContractPageProps) {
  const { contractId } = params;
  const supabase = await createClient();
  const { data: user, error } = await supabase.auth.getUser();


  try {
    const { contractData, contractInOrganizationData, isAuthenticated } = 
      await getContractPageData(contractId, user);
    

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
        <ContractDetails 
          contractId={contractId} 
          linkDr={contractData.linkDr || ''} 
          linkDelivery={contractData.linkDelivery || ''} 
          summary={contractData.summary || ''} 
          executionDeadlineDays={contractData.executionDeadlineDays || 0} 
          maxLots={contractData.maxLots || 0} 
          maxLotsPerContestant={contractData.maxLotsPerContestant || 0} 
          awardCriteria={contractData.awardCriteria || []} 
          renews={contractData.renews || false} 
        />
        
        
        <h2>Issuer</h2>
        <ContractIssuerInfo 
          reviewBodyInfo={contractData?.reviewBodyInfo || {}} 
          issuerInfo={contractData?.issuerInfo || {}} 
        />
        
        <h2>Files</h2>
        <ContractFiles documents={contractData.documents || []} />

        {isAuthenticated && (
          <>
            <h2>Notes</h2>
            <ContractNotes comments={contractInOrganizationData?.comments || ""} />
          </>
        )}
        {/* Render contractLots here */}
      </div>
    );
  } catch (error) {
    console.error("Error fetching contract data:", error);
    notFound();
  }
}
