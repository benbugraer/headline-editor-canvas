import React from "react";
import { SIDEBAR_ITEMS } from "../types/canvas.types";
import { Canvas as FabricCanvas } from "fabric";
import { useCanvasShapes } from "../hooks/useCanvasShapes";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { IconPicker } from "../Features/IconPicker";
import { HeadlineSelector } from "../Features/HeadlineSelector";
import { SidebarButton } from "./SidebarButton";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  canvas: FabricCanvas | null;
}

export default function Sidebar({ canvas }: SidebarProps) {
  const [isIconDrawerOpen, setIsIconDrawerOpen] = React.useState(false);
  const [isHeadlineDrawerOpen, setIsHeadlineDrawerOpen] = React.useState(false);

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
          <Drawer open={isIconDrawerOpen} onOpenChange={setIsIconDrawerOpen}>
            <DrawerTrigger asChild>
              <div>
                <SidebarButton icon={item.icon} label={item.label} />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>İkon Seçin</DrawerTitle>
                <DrawerDescription>Listeden bir ikon seçin</DrawerDescription>
              </DrawerHeader>
              <Separator />
              <div className="p-4">
                <IconPicker
                  onIconSelect={(icon) => {
                    handleAddIcon(icon, "defaultColor");
                    setIsIconDrawerOpen(false);
                  }}
                />
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button>İptal</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        );

      case "Manşet Seç":
        return (
          <Drawer
            open={isHeadlineDrawerOpen}
            onOpenChange={setIsHeadlineDrawerOpen}
          >
            <DrawerTrigger asChild>
              <div>
                <SidebarButton icon={item.icon} label={item.label} />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Manşet Seçin</DrawerTitle>
                <DrawerDescription className="text-tertiary">
                  Oluşturmak istediğiniz manşet türünü ve ölçüsünü seçin.
                </DrawerDescription>
              </DrawerHeader>
              <Separator />
              <HeadlineSelector
                canvas={canvas}
                onSelect={() => setIsHeadlineDrawerOpen(false)}
              />
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button>İptal</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
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
}
