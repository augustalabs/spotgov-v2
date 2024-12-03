"use client";

import useUserStore from "@/stores/use-user-store";

export const useUser = () => {
  const userStore = useUserStore();
  userStore.getUser();

  return {
    user: userStore.user,
    isLoading: userStore.isLoading,
    error: userStore.error,
  };
};
