import { ChevronsUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type NavUserProps = {
  userName: string;
  userEmail: string;
  userAvatarUrl: string;
  shouldHaveIcon?: boolean;
};

const NavUser = ({
  userName,
  userEmail,
  userAvatarUrl,
  shouldHaveIcon,
}: NavUserProps) => {
  return (
    <div className="flex items-center justify-between gap-2 truncate">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={userAvatarUrl} alt={userName} />
          <AvatarFallback className="rounded-lg">
            {userName.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{userName}</span>
          <span className="truncate text-xs">{userEmail}</span>
        </div>
      </div>
      {shouldHaveIcon && (
        <ChevronsUpDown size={16} className="ml-auto flex-shrink-0" />
      )}
    </div>
  );
};

export default NavUser;
