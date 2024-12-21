import { User } from "@supabase/supabase-js";

export const isSuperAdmin = (user: User) => user.user_metadata.is_super_admin === true;
