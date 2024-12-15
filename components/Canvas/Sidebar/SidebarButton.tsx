import { IconType } from "react-icons";

interface SidebarButtonProps {
  icon: IconType;
  label: string;
  onClick?: () => void;
}

export const SidebarButton = ({
  icon: Icon,
  label,
  onClick,
}: SidebarButtonProps) => (
  <button
    className="w-full flex flex-col items-center p-2 gap-1 transition-all ease-linear hover:bg-tertiary duration-200 hover:rounded-sm"
    onClick={onClick}
  >
    <Icon className="h-5 w-5 text-primary" />
    <span className="text-xs font-normal text-primary">{label}</span>
  </button>
);
