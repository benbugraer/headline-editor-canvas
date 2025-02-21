import React from "react";
import DownloadButton from "./DownloadButton";
import { Canvas } from "fabric";
import { Input } from "../ui/input";
import { useState } from "react";

interface TopBarProps {
  canvas: Canvas | null;
}

export default function TopBar({ canvas }: TopBarProps) {
  const [fileName, setFileName] = useState("");

  return (
    <header className="flex flex-col bg-secondary">
      <div className="flex h-10 lg:h-14 items-center gap-4 border-b border-primary">
        <div className="flex justify-start ml-5">
          <Input
            className="border-primary rounded-sm"
            placeholder="Görsel Adı"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center gap-2 ml-auto mr-6">
          <DownloadButton canvas={canvas} fileName={fileName} />
        </div>
      </div>
    </header>
  );
}
