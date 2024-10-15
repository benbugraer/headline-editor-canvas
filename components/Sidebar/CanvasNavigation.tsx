"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "../ui/dock";
import { PiFolderSimpleUserBold } from "react-icons/pi";
import { HiTemplate } from "react-icons/hi";
import { RxText } from "react-icons/rx";
import { MdPhoto, MdUpload } from "react-icons/md";

const items = [
  { label: "Tasarımlarım", icon: PiFolderSimpleUserBold },
  { label: "Şablonlar", icon: HiTemplate },
  { label: "Yazı", icon: RxText },
  { label: "Görseller", icon: MdPhoto },
  { label: "Yükle", icon: MdUpload },
];

const NavigationItems = ({
  label,
  icon: Icon,
}: {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) => (
  <DockIcon key={label}>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="hover:bg-primary hover:text-white rounded-full"
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

export default function CanvasNavigation() {
  return (
    <TooltipProvider>
      <Dock direction="middle" className="bg-tertiary">
        {items.map((item) => (
          <NavigationItems key={item.label} {...item} />
        ))}
      </Dock>
    </TooltipProvider>
  );
}
