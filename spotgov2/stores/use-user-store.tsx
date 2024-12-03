"use client";

import { User } from "@/database/schemas";
import { create } from "zustand";
import useSupabase from "@/hooks/use-supabase";

type UserStoreProps = {
  user: User | null;
  isLoading: boolean;
  error: string;
  getUser: () => Promise<void>;
};

async function getUserFromSupabaseAuth(): Promise<User | null> {
  const supabase = useSupabase();
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  if (!data.user) return null;

  return {
    id: data.user.id!,
    email: data.user.email!,
    name: data.user.user_metadata.full_name!,
    avatarUrl: data.user.user_metadata.avatar_url!,
    createdAt: new Date(data.user.created_at!),
    updatedAt: new Date(data.user.updated_at!),
  };
}

const useUserStore = create<UserStoreProps>((set) => ({
  user: null,
  isLoading: true,
  error: "",
  getUser: async () => {
    try {
      const user = await getUserFromSupabaseAuth();
      set({ user });
    } catch (error) {
      const err = error as Error;
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useUserStore;
