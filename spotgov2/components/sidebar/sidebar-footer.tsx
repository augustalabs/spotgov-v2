import Image from "next/image";
import {
  SidebarFooter as Footer,
  SidebarMenu,
  SidebarMenuItem,
} from "../ui/sidebar";
import { createClient } from "@/lib/supabase/server";
import { LogOut, User } from "lucide-react";
import { signOut } from "@/features/auth/actions";
import { Separator } from "../ui/separator";
import OrganizationSwitcher from "./organization-switcher";

const SidebarFooter = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <Footer>
      <OrganizationSwitcher />
      <Separator className="mb-4 mx-auto max-w-[calc(100%-1rem)]" />
      <SidebarMenu>
        <SidebarMenuItem className="px-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {data?.user?.user_metadata?.avatar_url ? (
              <Image
                alt="profile icon"
                className="rounded-full object-cover"
                src={data?.user?.user_metadata?.avatar_url}
                width={28}
                height={28}
              />
            ) : (
              <div className="size-7 border bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
            )}
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
