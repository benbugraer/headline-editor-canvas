import React from "react";
import { IconType } from "react-icons";

interface SidebarButtonProps {
  icon: IconType;
  label: string;
  onClick?: () => void;
}

export const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon: Icon,
  label,
  onClick,
}) => (
  <button
    className="w-full flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded-lg transition-colors"
    onClick={onClick}
  >
    <Icon className="h-5 w-5 text-primary" />
    <span className="text-xs font-normal text-primary">{label}</span>
  </button>
);
