import React, { memo } from "react";
import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

interface EffectsHeaderProps {
  onClose: () => void;
}

export const EffectsHeader = memo(({}: EffectsHeaderProps) => (
  <SheetHeader className="flex items-center justify-between border-b border-gray-200 pb-4">
    <div>
      <SheetTitle className="text-xl font-bold text-gray-800">
        Nesne Efektleri
      </SheetTitle>
      <SheetDescription className="text-gray-500 mt-1">
        Seçili nesnenin görsel özelliklerini özelleştirin
      </SheetDescription>
    </div>
  </SheetHeader>
));

EffectsHeader.displayName = "EffectsHeader";
