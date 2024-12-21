import { TypeIcon as type, LucideIcon } from "lucide-react";

interface InfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="dark:hover:bg-gray-750 group flex items-center space-x-2 rounded-lg border border-gray-200 bg-white p-3 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary-foreground">
        <Icon className="h-3.5 w-3.5 text-primary" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
          {label}
        </p>
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

export default InfoItem;
