import React from "react";
import { IconType } from "react-icons";
interface IconDrawerProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onIconSelect: (icon: string) => void;
    item: {
        icon: IconType;
        label: string;
    };
}
export declare const IconDrawer: React.FC<IconDrawerProps>;
export {};
