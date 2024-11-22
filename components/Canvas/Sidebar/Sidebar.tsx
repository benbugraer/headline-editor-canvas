import React from "react";
import { SIDEBAR_ITEMS } from "../types/canvas.types";
import { Canvas as FabricCanvas } from "fabric";
import { useCanvasShapes } from "../hooks/useCanvasShapes";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { IconPicker } from "../Features/IconPicker";

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
    if (file) {
      handleImageUpload(file);
    }
  };

  const getClickHandler = (label: string) => {
    switch (label) {
      case "Dikdörtgen":
        return handleAddRectangle;
      case "Daire":
        return handleAddCircle;
      case "Metin":
        return handleAddText;
      case "Görsel Ekle":
        return () => fileInputRef.current?.click();
      default:
        return () => {};
    }
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
            <div key={item.label}>
              {item.label === "İkon Ekle" ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <div>
                      <button
                        className="w-full flex flex-col items-center p-2 gap-1 transition-all ease-linear hover:bg-tertiary duration-150 hover:rounded-sm"
                        onClick={() => {}}
                      >
                        <item.icon className="h-5 w-5 text-primary" />
                        <span className="text-xs font-normal text-primary">
                          {item.label}
                        </span>
                      </button>
                    </div>
                  </PopoverTrigger>
                  <IconPicker onIconSelect={handleAddIcon} />
                </Popover>
              ) : (
                <button
                  className="w-full flex flex-col items-center p-2 gap-1 transition-all ease-linear hover:bg-tertiary duration-200 hover:rounded-sm"
                  onClick={getClickHandler(item.label)}
                >
                  <item.icon className="h-5 w-5 text-primary" />
                  <span className="text-xs font-normal text-primary">
                    {item.label}
                  </span>
                </button>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
