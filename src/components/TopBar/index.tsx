import React, { useState } from "react";
import { Canvas } from "fabric";
import { Input } from "../ui/input";

interface TopBarProps {
  canvas: Canvas | null;
  onSave?: (dataUrl: string) => void;
  onClose?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ canvas, onSave, onClose }) => {
  const [fileName, setFileName] = useState("");

  const handleSave = () => {
    if (canvas && onSave) {
      const dataUrl = canvas.toDataURL({
        format: "png",
        quality: 1,
        multiplier: 2,
      });
      onSave(dataUrl);
    }
  };

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
          <button onClick={handleSave}>Kaydet</button>
          {onClose && <button onClick={onClose}>Kapat</button>}
        </div>
      </div>
    </header>
  );
};
