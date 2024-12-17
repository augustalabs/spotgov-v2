import { getContractById } from ".";

import { createContractInOrganization } from ".";

import { notFound } from "next/navigation";
import { getContractInOrganization } from ".";

interface ContractPageData {
    contractData: any; // Replace with proper type
    contractInOrganizationData: any | null; // Replace with proper type
    isAuthenticated: boolean;
  }
  
  export async function getContractPageData(contractId: string, user: any): Promise<ContractPageData> {
    const isAuthenticated = !!user;
  
    let contractData;
    let contractInOrganizationData = null;
  
    if (isAuthenticated) {
      const currentOrganization = user?.user?.user_metadata.current_organization.organization.id;
  
      // Fetch contract with organization-specific data
      const contractWithOrg = await getContractInOrganization({
        contractId,
        organizationId: currentOrganization,
      });
  
      if (!contractWithOrg) {
        notFound();
      }
  
      // If contracts_organizations record doesn't exist, create it asynchronously
      if (!contractWithOrg.contractsOrganization) {
        createContractInOrganization({
          contractId,
          organizationId: currentOrganization,
        }).catch((error) => {
          console.error("Error creating contracts_organizations record:", error);
        });
  
        contractWithOrg.contractsOrganization = {
          contractId,
          organizationId: currentOrganization,
          saved: false,
          comments: null,
          labels: [],
        };
      }
  
      contractData = contractWithOrg;
      contractInOrganizationData = contractWithOrg.contractsOrganization;
    } else {
      // If not authenticated, fetch only the basic contract details
      const contract = await getContractById({ contractId });
  
      if (!contract) {
        notFound();
      }
  
      contractData = contract;
    }
  
    return {
      contractData,
      contractInOrganizationData,
      isAuthenticated
    };
  }