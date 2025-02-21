import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { Separator } from "../../ui/separator";
import { HeadlineSelector } from "../Features/HeadlineSelector";
import { SidebarButton } from "./SidebarButton";
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

export const HeadlineDrawer: React.FC<HeadlineDrawerProps> = ({
  isOpen,
  onOpenChange,
  canvas,
  item,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <div>
          <SidebarButton icon={item.icon} label={item.label} />
        </div>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Manşet Seçin</SheetTitle>
          <SheetDescription className="text-tertiary">
            Oluşturmak istediğiniz manşet türünü ve ölçüsünü seçin.
          </SheetDescription>
        </SheetHeader>
        <Separator />
        <HeadlineSelector
          canvas={canvas}
          onSelect={() => onOpenChange(false)}
        />
      </SheetContent>
    </Sheet>
  );
};
