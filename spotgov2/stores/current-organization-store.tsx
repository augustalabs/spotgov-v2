import { OrganizationWithUserInfo } from "@/types";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import { create } from "zustand";

type CurrentOrganizationStoreProps = {
  currentOrganization: OrganizationWithUserInfo | null;
  setCurrentOrganization: (
    organization: OrganizationWithUserInfo,
    auth: SupabaseAuthClient
  ) => void;
};

export const useCurrentOrganizationStore =
  create<CurrentOrganizationStoreProps>((set) => ({
    currentOrganization: null,
    setCurrentOrganization: (organization, auth) => {
      set({ currentOrganization: organization });
      auth.updateUser({
        data: {
          current_organization: organization,
        },
      });
    },
  }));
