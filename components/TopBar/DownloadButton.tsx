"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { FaDownload } from "react-icons/fa";
import { Canvas } from "fabric";

interface DownloadButtonProps {
  canvas: Canvas | null;
  fileName: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  canvas,
  fileName,
}) => {
  const [quality, setQuality] = useState(90); // Varsayılan kaliteyi 90'a yükselttim
  const [multiplier, setMultiplier] = useState(2); // Çözünürlük çarpanı ekledim

  const handleDownload = () => {
    if (!canvas) {
      console.warn("Canvas is not available");
      return;
    }

    const dataURL = canvas.toDataURL({
      format: "jpeg",
      quality: quality / 100,
      multiplier: multiplier, // Daha yüksek çözünürlük için multiplier kullanıyoruz
    });

    // Create a temporary link to trigger download
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `${fileName}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-primaryBlue rounded-md focus:outline-none text-white hover:bg-tertiary hover:text-primary ease-linear duration-150">
          <FaDownload className="mr-2 h-4 w-4" /> Download JPG
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-secondary">
        <div className="px-2 py-1.5">
          <label className="text-sm font-medium">Quality: {quality}%</label>
          <Slider
            className="mt-2"
            min={1}
            max={100}
            step={1}
            value={[quality]}
            onValueChange={(value) => setQuality(value[0])}
          />
        </div>

        <div className="px-2 py-1.5">
          <label className="text-sm font-medium">
            Resolution Scale: {multiplier}x
          </label>
          <Slider
            className="mt-2"
            min={1}
            max={4}
            step={0.5}
            value={[multiplier]}
            onValueChange={(value) => setMultiplier(value[0])}
          />
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleDownload}
          className="bg-primaryBlue text-white flex items-center justify-center rounded-md border border-primary cursor-pointer hover:bg-secondary hover:text-link ease-linear duration-300"
        >
          Download JPG
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DownloadButton;
