import React from "react";
import * as fabric from "fabric";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RxText } from "react-icons/rx";
import { MdOutlineRectangle, MdOutlineCircle } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";
import { Canvas as FabricCanvas } from "fabric";

interface SidebarProps {
  canvas: FabricCanvas | null;
}

export default function Sidebar({ canvas }: SidebarProps) {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleAddRectangle = () => {
    if (!canvas) return;
    const rect = new fabric.Rect({
      top: 100,
      left: 50,
      width: 100,
      height: 60,
      fill: "#ff5757",
    });
    canvas.add(rect);
    canvas.renderAll();
  };

  const handleAddCircle = () => {
    if (!canvas) return;
    const circle = new fabric.Circle({
      top: 150,
      left: 150,
      radius: 50,
      fill: "#d84d42",
    });
    canvas.add(circle);
    canvas.renderAll();
  };

  const handleAddText = () => {
    if (!canvas) return;
    const text = new fabric.IText("Text", {
      left: 100,
      top: 100,
      fontFamily: "Arial",
      fontSize: 20,
      fill: "#000000",
    });
    text.on("mousedown", (e: fabric.IEvent) => {
      if (e.button !== 2) return;
      text.enterEditing();
      text.selectAll();
      canvas.renderAll();
    });

    canvas.add(text);
    canvas.renderAll();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !canvas) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const fabricImage = new fabric.Image(img);
        fabricImage.scaleToWidth(200);
        canvas.add(fabricImage);
        canvas.renderAll();
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const items = [
    {
      label: "Rectangle",
      icon: MdOutlineRectangle,
      onClick: handleAddRectangle,
    },
    {
      label: "Circle",
      icon: MdOutlineCircle,
      onClick: handleAddCircle,
    },
    {
      label: "Text",
      icon: RxText,
      onClick: handleAddText,
    },
    {
      label: "Add Image",
      icon: RiImageAddFill,
      onClick: () => fileInputRef.current?.click(),
    },
  ];

  return (
    <aside className="hidden lg:flex h-screen w-55 flex-col border-r">
      <div className="flex-1 overflow-y-auto p-4">
        <TooltipProvider>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageUpload}
            accept="image/*"
          />
          <nav className="space-y-2">
            {items.map((item) => (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 hover:bg-primary hover:text-white"
                    onClick={item.onClick}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Add {item.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </nav>
        </TooltipProvider>
      </div>
    </aside>
  );
}
