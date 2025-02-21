import React from "react";
import { Canvas } from "fabric";
import { IconDrawer } from "./IconDrawer";
import { HeadlineDrawer } from "./HeadlineDrawer";
import { SidebarButton } from "./SidebarButton";
import { useCanvasShapes } from "../../hooks/useCanvasShapes";
import { useSidebarState } from "../../hooks/useSidebarState";
import { SIDEBAR_ITEMS } from "../../constants";

interface SidebarProps {
  canvas: Canvas | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ canvas }) => {
  const {
    isIconDrawerOpen,
    setIsIconDrawerOpen,
    isHeadlineDrawerOpen,
    setIsHeadlineDrawerOpen,
  } = useSidebarState();

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
    switch (item.label) {
      case "İkon Ekle":
        return (
          <IconDrawer
            isOpen={isIconDrawerOpen}
            onOpenChange={setIsIconDrawerOpen}
            onIconSelect={(icon) => handleAddIcon(icon)}
            item={item}
          />
        );

      case "Manşet Seç":
        return (
          <HeadlineDrawer
            isOpen={isHeadlineDrawerOpen}
            onOpenChange={setIsHeadlineDrawerOpen}
            canvas={canvas}
            item={item}
          />
        );

      default:
        return (
          <SidebarButton
            icon={item.icon}
            label={item.label}
            onClick={itemHandlers[item.label as keyof typeof itemHandlers]}
          />
        );
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
            <div key={item.label}>{renderSidebarItem(item)}</div>
          ))}
        </nav>
      </div>
    </div>
  );
};
