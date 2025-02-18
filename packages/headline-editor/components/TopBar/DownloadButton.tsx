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
  const [quality, setQuality] = useState(90);
  const [multiplier, setMultiplier] = useState(2);

  const handleDownload = () => {
    if (!canvas) {
      console.warn("Canvas is not available");
      return;
    }

    const dataURL = canvas.toDataURL({
      format: "jpeg",
      quality: quality / 100,
      multiplier: multiplier,
    });

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
        <Button className="bg-primaryBlue rounded-md focus:outline-none text-white hover:bg-tertiary hover:text-primary ease-linear duration-200 gap-2">
          <FaDownload className="h-4 w-4" /> Görseli Kaydet
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-secondary">
        <div className="px-2 py-1.5">
          <label className="text-sm font-medium">Kalite: {quality}%</label>
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
            Çözünürlük: {multiplier}x
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
        <DropdownMenuItem>
          <Button
            className="w-full inline-block bg-primaryBlue text-white hover:bg-tertiary hover:text-primary ease-linear duration-200"
            variant="outline"
            onClick={handleDownload}
          >
            Kaydet
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DownloadButton;
