import { User } from "lucide-react";

const AvatarIcon = ({ size }: { size: number }) => {
  return (
    <div className="size-7 border bg-primary/10 text-primary rounded-full flex items-center justify-center">
      <User size={size} />
    </div>
  );
};

export default AvatarIcon;
