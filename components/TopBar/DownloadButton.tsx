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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { FaDownload } from "react-icons/fa";
import { Canvas } from "fabric";

type FileType = "JPEG" | "PNG" | "SVG";

const fileTypes: FileType[] = ["JPEG", "PNG", "SVG"];

interface DownloadButtonProps {
  canvas: Canvas | null;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ canvas }) => {
  const [selectedFileType, setSelectedFileType] = useState<FileType>("JPEG");
  const [quality, setQuality] = useState(72);

  const handleDownload = () => {
    if (!canvas) {
      console.warn("Canvas is not available");
      return;
    }

    let dataURL = "";
    switch (selectedFileType) {
      case "JPEG":
        dataURL = canvas.toDataURL({
          format: "jpeg",
          quality: quality / 100,
        });
        break;
      case "PNG":
        dataURL = canvas.toDataURL({
          format: "png",
          quality: quality / 100,
        });
        break;
      case "SVG":
        dataURL =
          "data:image/svg+xml;charset=utf-8," +
          encodeURIComponent(canvas.toSVG());
        break;
      default:
        console.warn("Unsupported file type");
        return;
    }

    // Create a temporary link to trigger download
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `canvas-export.${selectedFileType.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-primaryBlue focus:outline-none text-white hover:bg-tertiary hover:text-primary ease-linear duration-150">
          <FaDownload className="mr-2 h-4 w-4" /> Download
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-secondary mr-8">
        <div className="px-2 py-1.5">
          <label className="text-sm font-medium mb-1 block">File Type</label>
          <Select
            value={selectedFileType}
            onValueChange={(value) => setSelectedFileType(value as FileType)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select file type" />
            </SelectTrigger>
            <SelectContent>
              {fileTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="px-2 py-1.5">
          <label className="text-sm font-medium">
            Quality (DPI): {quality}
          </label>
          <Slider
            className="mt-2"
            min={1}
            max={100}
            step={1}
            value={[quality]}
            onValueChange={(value) => setQuality(value[0])}
          />
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleDownload}
          className="bg-primaryBlue text-white flex items-center justify-center rounded-md border border-primary cursor-pointer hover:bg-secondary hover:text-link ease-linear duration-300"
        >
          Download {selectedFileType}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DownloadButton;
