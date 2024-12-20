import React, { memo } from "react";
import {
  DrawerHeader as UIDrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DrawerHeaderProps {
  onClose: () => void;
}

export const DrawerHeader = memo(({ onClose }: DrawerHeaderProps) => (
  <UIDrawerHeader className="flex items-center justify-between border-b border-gray-200 pb-4">
    <div>
      <DrawerTitle className="text-xl font-bold text-gray-800">
        Nesne Efektleri
      </DrawerTitle>
      <DrawerDescription className="text-gray-500 mt-1">
        Seçili nesnenin görsel özelliklerini özelleştirin
      </DrawerDescription>
    </div>
    <DrawerClose asChild>
      <Button
        variant="ghost"
        size="icon"
        className="text-red-500"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>
    </DrawerClose>
  </UIDrawerHeader>
));

DrawerHeader.displayName = "DrawerHeader";
