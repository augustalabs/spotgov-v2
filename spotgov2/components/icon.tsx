import React from "react";

import { cn } from "@/utils/utils";

interface IconProps {
  IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  IconComponent,
  className = "",
  ...props
}) => (
  <IconComponent
    className={cn("h-4 w-4 flex-shrink-0 text-secondary", className)}
    {...props}
  />
);

export default Icon;
