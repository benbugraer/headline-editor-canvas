import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Canvas as FabricCanvas } from "fabric";
import { TOOLBAR_ITEMS } from "./types/canvas.types";
import { useCanvasShapes } from "./hooks/useCanvasShapes";
import { ToolbarButton } from "./ToolbarButton";

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
  } = useCanvasShapes(canvas);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const getClickHandler = (label: string) => {
    switch (label) {
      case "Rectangle":
        return handleAddRectangle;
      case "Circle":
        return handleAddCircle;
      case "Text":
        return handleAddText;
      case "Add Image":
        return () => fileInputRef.current?.click();
      default:
        return () => {};
    }
  };

  return (
    <aside className="hidden lg:flex h-screen w-55 flex-col border-r">
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
              <ToolbarButton
                key={item.label}
                label={item.label}
                icon={item.icon}
                onClick={getClickHandler(item.label)}
              />
            ))}
          </nav>
        </TooltipProvider>
      </div>
    </aside>
  );
}
