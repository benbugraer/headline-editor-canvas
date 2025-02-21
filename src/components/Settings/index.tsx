import React, { useEffect, useState } from "react";
import { Canvas } from "fabric";
import { ColorPicker } from "../ui/color-picker";
import { Input } from "../ui/input";
import { Select } from "../ui/select";

interface SettingsProps {
  canvas: Canvas | null;
}

export const Settings: React.FC<SettingsProps> = ({ canvas }) => {
  const [activeObject, setActiveObject] = useState<any>(null);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(48);
  const [fontFamily, setFontFamily] = useState("Arial");

  useEffect(() => {
    if (!canvas) return;

    const updateActiveObject = () => {
      const active = canvas.getActiveObject();
      setActiveObject(active);
      if (active) {
        if (active.type === "i-text") {
          setTextColor(active.fill || "#000000");
          setFontSize(active.fontSize || 48);
          setFontFamily(active.fontFamily || "Arial");
        }
      }
    };

    canvas.on("selection:created", updateActiveObject);
    canvas.on("selection:updated", updateActiveObject);
    canvas.on("selection:cleared", () => setActiveObject(null));

    return () => {
      canvas.off("selection:created", updateActiveObject);
      canvas.off("selection:updated", updateActiveObject);
      canvas.off("selection:cleared", () => setActiveObject(null));
    };
  }, [canvas]);

  const handleBackgroundColorChange = (color: string) => {
    if (!canvas) return;
    setBackgroundColor(color);
    canvas.setBackgroundColor(color, () => canvas.renderAll());
  };

  const handleTextColorChange = (color: string) => {
    if (!activeObject || activeObject.type !== "i-text") return;
    setTextColor(color);
    activeObject.set("fill", color);
    canvas?.renderAll();
  };

  const handleFontSizeChange = (value: string) => {
    if (!activeObject || activeObject.type !== "i-text") return;
    const size = parseInt(value);
    setFontSize(size);
    activeObject.set("fontSize", size);
    canvas?.renderAll();
  };

  const handleFontFamilyChange = (value: string) => {
    if (!activeObject || activeObject.type !== "i-text") return;
    setFontFamily(value);
    activeObject.set("fontFamily", value);
    canvas?.renderAll();
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex gap-4 items-center">
        <div>
          <label>Arkaplan Rengi</label>
          <ColorPicker
            color={backgroundColor}
            onChange={handleBackgroundColorChange}
          />
        </div>
        {activeObject?.type === "i-text" && (
          <>
            <div>
              <label>Yazı Rengi</label>
              <ColorPicker color={textColor} onChange={handleTextColorChange} />
            </div>
            <div>
              <label>Yazı Boyutu</label>
              <Input
                type="number"
                value={fontSize}
                onChange={(e) => handleFontSizeChange(e.target.value)}
                min={1}
                max={200}
              />
            </div>
            <div>
              <label>Yazı Tipi</label>
              <Select
                value={fontFamily}
                onChange={(e) => handleFontFamilyChange(e.target.value)}
                options={[
                  { value: "Arial", label: "Arial" },
                  { value: "Times New Roman", label: "Times New Roman" },
                  { value: "Courier New", label: "Courier New" },
                ]}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
