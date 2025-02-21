import React from "react";
import { IconType } from "react-icons";
interface SidebarButtonProps {
    icon: IconType;
    label: string;
    onClick?: () => void;
}
export declare const SidebarButton: React.FC<SidebarButtonProps>;
export {};
