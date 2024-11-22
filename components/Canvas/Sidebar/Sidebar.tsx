import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Canvas as FabricCanvas } from "fabric";
import { TOOLBAR_ITEMS } from "../types/canvas.types";
import { useCanvasShapes } from "../hooks/useCanvasShapes";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { IconPicker } from "../Features/IconPicker";
import { Button } from "../../ui/button";

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
    <div className="w-40 flex flex-col border-r bg-secondary">
      <div className="flex-1 overflow-y-auto p-4">
        <TooltipProvider>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
          <nav className="space-y-2">
            {TOOLBAR_ITEMS.map((item) => (
              <React.Fragment key={item.label}>
                {item.label === "İkon Ekle" ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <div>
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 hover:bg-primary hover:text-white"
                          onClick={() => {}}
                        >
                          <item.icon className="h-7 w-7" />
                          <span>{item.label}</span>
                        </Button>
                      </div>
                    </PopoverTrigger>
                    <IconPicker onIconSelect={handleAddIcon} />
                  </Popover>
                ) : (
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 hover:bg-primary hover:text-white"
                    onClick={getClickHandler(item.label)}
                  >
                    <item.icon className="h-7 w-7" />
                    <span>{item.label}</span>
                  </Button>
                )}
              </React.Fragment>
            ))}
          </nav>
        </TooltipProvider>
      </div>
    </div>
  );
}
