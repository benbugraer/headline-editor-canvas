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

type FileType =
  | "PDF"
  | "JPEG"
  | "PNG"
  | "HTML"
  | "SVG"
  | "JSON"
  | "GIF"
  | "MP4 Video (Beta)";

const fileTypes: FileType[] = ["JPEG", "PNG", "HTML", "SVG", "JSON"];

const DownloadButton = () => {
  const [selectedFileType, setSelectedFileType] = useState<FileType>("PDF");
  const [quality, setQuality] = useState(72);
  const [pageSize, setPageSize] = useState(381);

  const handleDownload = () => {
    // Implement your download logic here
    console.log(
      `Downloading ${selectedFileType} file with quality: ${quality} DPI and page size: ${pageSize}x${pageSize} mm`
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-primaryBlue focus:outline-none text-white hover:bg-tertiary hover:text-primary ease-linear duration-150 ">
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

        <div className="px-2 py-1.5">
          <label className="text-sm font-medium">
            Page Size: {pageSize}x{pageSize} mm
          </label>
          <Slider
            className="mt-2"
            min={1}
            max={1000}
            step={1}
            value={[pageSize]}
            onValueChange={(value) => setPageSize(value[0])}
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
