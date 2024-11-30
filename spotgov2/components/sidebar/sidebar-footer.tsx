import Image from "next/image";
import {
  SidebarFooter as Footer,
  SidebarMenu,
  SidebarMenuItem,
} from "../ui/sidebar";
import { createClient } from "@/lib/supabase/server";
import { LogOut } from "lucide-react";
import { signOut } from "@/features/auth/actions";

const SidebarFooter = async () => {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <Footer>
      <SidebarMenu>
        <SidebarMenuItem className="px-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              alt="profile icon"
              className="rounded-full object-cover"
              src={data?.user?.user_metadata?.avatar_url}
              width={28}
              height={28}
            />
            <p className="text-sm max-w-32 truncate">
              {data?.user?.user_metadata?.full_name}
            </p>
          </div>
          <form className="flex items-center">
            <button formAction={signOut} className="hover:text-primary">
              <LogOut size={16} />
            </button>
          </form>
        </SidebarMenuItem>
      </SidebarMenu>
    </Footer>
  );
};

export default SidebarFooter;
