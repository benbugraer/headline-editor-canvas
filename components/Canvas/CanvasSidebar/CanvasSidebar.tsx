import React, { useState } from "react";
import { Canvas as FabricCanvas } from "fabric";
import { TOOLBAR_ITEMS } from "../types/canvas.types";
import { useCanvasShapes } from "../hooks/useCanvasShapes";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { BiSolidChevronLeftSquare } from "react-icons/bi";

interface SidebarProps {
  canvas: FabricCanvas | null;
}

export default function CanvasSidebar({ canvas }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
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
    <SidebarProvider>
      <Sidebar
        className={cn(
          "transition-all duration-300",
          isCollapsed ? "w-[50px]" : "w-48"
        )}
      >
        <SidebarHeader className="p-2 flex ">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <BiSolidChevronLeftSquare
              className={cn(
                "h-10 w-10 transition-transform",
                isCollapsed && "rotate-180"
              )}
            />
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            {!isCollapsed && <SidebarGroupLabel>Şekiller</SidebarGroupLabel>}
            <SidebarGroupContent>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
              <SidebarMenu>
                {TOOLBAR_ITEMS.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      onClick={getClickHandler(item.label)}
                      className={cn(
                        "flex items-center",
                        isCollapsed && "justify-center px-2"
                      )}
                    >
                      <item.icon
                        className={cn("h-10 w-10", !isCollapsed && "mr-2")}
                      />
                      {!isCollapsed && <span>{item.label}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
