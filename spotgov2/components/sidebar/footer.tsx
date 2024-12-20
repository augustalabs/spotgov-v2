import { createClient } from "@/lib/supabase/server";
import { LOGIN_ROUTE } from "@/routes";
import { redirect } from "next/navigation";
import { SidebarMenuButton } from "../ui/sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import NavUser from "./nav-user";
import { Separator } from "../ui/separator";
import { signOut } from "@/features/auth/api";
import { LogOut } from "lucide-react";
import Contacts from "./contacts";
import { getTranslations } from "next-intl/server";

const Footer = async () => {
  const supabase = await createClient();
  const { data: userData, error } = await supabase.auth.getUser();

  if (error || !userData) redirect(LOGIN_ROUTE.url);

  const userName = userData?.user.user_metadata.full_name;
  const userEmail = userData?.user.email ?? "";
  const userAvatarUrl = userData?.user.user_metadata.avatar_url;

  const userButtonTranslation = await getTranslations("sidebar.userButton");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <NavUser
            userName={userName}
            userEmail={userEmail}
            userAvatarUrl={userAvatarUrl}
            shouldHaveIcon
          />
        </SidebarMenuButton>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <NavUser
            userName={userName}
            userEmail={userEmail}
            userAvatarUrl={userAvatarUrl}
          />
          <Separator />
          <Contacts />
          <Separator />
          <form>
            <button
              formAction={signOut}
              className="flex items-center gap-2 text-sm hover:text-primary"
            >
              <LogOut size={16} />
              <span>{userButtonTranslation("logout")}</span>
            </button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Footer;
