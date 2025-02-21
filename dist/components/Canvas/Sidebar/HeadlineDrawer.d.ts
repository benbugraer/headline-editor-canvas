import React from "react";
import { Canvas as FabricCanvas } from "fabric";
import { IconType } from "react-icons";
interface HeadlineDrawerProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    canvas: FabricCanvas | null;
    item: {
        icon: IconType;
        label: string;
    };
}
export declare const HeadlineDrawer: React.FC<HeadlineDrawerProps>;
export {};
