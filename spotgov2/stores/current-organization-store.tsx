import { OrganizationWithUserInfo } from "@/types";
import { create } from "zustand";

type CurrentOrganizationStoreProps = {
  currentOrganization: OrganizationWithUserInfo | null;
  setCurrentOrganization: (organization: OrganizationWithUserInfo) => void;
};

export const useCurrentOrganizationStore =
  create<CurrentOrganizationStoreProps>((set) => ({
    currentOrganization: null,
    setCurrentOrganization: (organization) => {
      set({ currentOrganization: organization });
    },
  }));
