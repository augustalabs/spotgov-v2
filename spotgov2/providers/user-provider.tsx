import { User } from "@/database/schemas";
import useSupabase from "@/hooks/use-supabase";
import { createContext, useEffect, useState } from "react";

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: string;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const supabase = useSupabase();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          setError(error.message);
        }

        if (data.user) {
          setUser({
            id: data.user.id!,
            email: data.user.email!,
            name: data.user.user_metadata.full_name!,
            avatarUrl: data.user.user_metadata.avatar_url!,
            createdAt: new Date(data.user.created_at!),
            updatedAt: new Date(data.user.updated_at!),
          });
        }
      } catch (error: unknown) {
        const err = error as Error;

        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};
