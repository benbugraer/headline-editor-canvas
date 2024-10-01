"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
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
        <div
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "size-12 rounded-full"
          )}
        >
          <Icon className="size-5" />
        </div>
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
      <Dock direction="middle">
        {items.map((item) => (
          <NavigationItems key={item.label} {...item} />
        ))}
      </Dock>
    </TooltipProvider>
  );
}
