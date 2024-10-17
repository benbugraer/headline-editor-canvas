"use client";

import React from "react";
import * as fabric from "fabric"; // Eklenen import
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "../ui/dock";
import { RxText } from "react-icons/rx";
import { MdOutlineRectangle, MdOutlineCircle } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";
import { Canvas as FabricCanvas } from "fabric";

interface CanvasNavigationProps {
  canvas: FabricCanvas | null;
}

const CanvasNavigation: React.FC<CanvasNavigationProps> = ({ canvas }) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleAddRectangle = () => {
    if (canvas) {
      const rect = new fabric.Rect({
        top: 100,
        left: 50,
        width: 100,
        height: 60,
        fill: "#ff5757",
      });
      canvas.add(rect);
      canvas.renderAll();
    }
  };

  const handleAddCircle = () => {
    if (canvas) {
      const circle = new fabric.Circle({
        top: 150,
        left: 150,
        radius: 50,
        fill: "#d84d42",
      });
      canvas.add(circle);
      canvas.renderAll();
    }
  };

  const handleAddText = () => {
    if (canvas) {
      const text = new fabric.IText("Text", {
        left: 100,
        top: 100,
        fontFamily: "Arial",
        fontSize: 20,
        fill: "#000000",
      });

      text.on("mousedown", (e) => {
        if (e.button !== 2) return;
        text.enterEditing();
        text.selectAll();
        canvas.renderAll();
      });

      canvas.add(text);
      canvas.renderAll();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && canvas) {
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
    }
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

  const NavigationItems = ({
    label,
    icon: Icon,
    onClick,
  }: {
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    onClick: () => void;
  }) => (
    <DockIcon key={label}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="hover:bg-primary hover:text-white rounded-full"
            onClick={onClick}
          >
            <Icon className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </DockIcon>
  );

  return (
    <TooltipProvider>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageUpload}
        accept="image/*"
      />
      <Dock direction="middle" className="bg-tertiary">
        {items.map((item) => (
          <NavigationItems key={item.label} {...item} />
        ))}
      </Dock>
    </TooltipProvider>
  );
};

export default CanvasNavigation;
