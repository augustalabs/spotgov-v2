import React from "react";

interface InfoItemProps {
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, icon, content }) => {
  return (
    <div className="flex flex-col">
      <span className="text-xs font-medium text-secondary">{label}</span>
      <span className="flex items-center justify-start gap-1.5 text-sm font-medium">
        {icon}
        {content}
      </span>
    </div>
  );
};

export default InfoItem;
