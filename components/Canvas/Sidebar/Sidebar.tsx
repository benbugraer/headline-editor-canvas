import React from "react";
import { SIDEBAR_ITEMS } from "../types/canvas.types";
import { Canvas as FabricCanvas } from "fabric";
import { useCanvasShapes } from "../hooks/useCanvasShapes";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { IconPicker } from "../Features/IconPicker";
import { HeadlineSelector } from "../Features/HeadlineSelector";
import { SidebarButton } from "./SidebarButton";

interface SidebarProps {
  canvas: FabricCanvas | null;
}

export default function Sidebar({ canvas }: SidebarProps) {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const {
    handleAddRectangle,
    handleAddCircle,
    handleAddText,
    handleImageUpload,
    handleAddIcon,
  } = useCanvasShapes(canvas);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const itemHandlers = {
    Dikdörtgen: handleAddRectangle,
    Daire: handleAddCircle,
    Metin: handleAddText,
    "Görsel Ekle": () => fileInputRef.current?.click(),
  } as const;

  const renderSidebarItem = (item: (typeof SIDEBAR_ITEMS)[number]) => {
    if (item.label === "İkon Ekle") {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <div>
              <SidebarButton icon={item.icon} label={item.label} />
            </div>
          </PopoverTrigger>
          <IconPicker onIconSelect={handleAddIcon} />
        </Popover>
      );
    }

    if (item.label === "Manşet Seç") {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <div>
              <SidebarButton icon={item.icon} label={item.label} />
            </div>
          </PopoverTrigger>
          <HeadlineSelector canvas={canvas} />
        </Popover>
      );
    }

    return (
      <SidebarButton
        icon={item.icon}
        label={item.label}
        onClick={itemHandlers[item.label as keyof typeof itemHandlers]}
      />
    );
  };

  return (
    <div className="w-28 flex flex-col border-r bg-gray-50 shadow-lg">
      <div className="flex-1 overflow-y-auto p-4">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
        <nav className="space-y-2">
          {SIDEBAR_ITEMS.map((item) => (
            <div key={item.label}>{renderSidebarItem(item)}</div>
          ))}
        </nav>
      </div>
    </div>
  );
}
