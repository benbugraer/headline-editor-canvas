import { useState, useCallback } from "react";
import * as fabric from "fabric"; // v6
import {
  TextFormatting,
  TextAlignType,
} from "@/components/Canvas/types/canvas.types";

export const useTextFormatting = (
  canvas: fabric.Canvas | null,
  selectedObject: fabric.Object | null
) => {
  const [textFormatting, setTextFormatting] = useState<TextFormatting>({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    textAlign: "left",
  });

  const updateTextFormatting = useCallback(
    (property: keyof TextFormatting, value: boolean | TextAlignType) => {
      if (selectedObject && selectedObject.type === "i-text") {
        const text = selectedObject as fabric.IText;

        switch (property) {
          case "bold":
            text.set({ fontWeight: value ? "bold" : "normal" });
            break;
          case "italic":
            text.set({ fontStyle: value ? "italic" : "normal" });
            break;
          case "underline":
            text.set({ underline: value as boolean });
            break;
          case "strikethrough":
            text.set({ linethrough: value as boolean });
            break;
          case "textAlign":
            text.set({ textAlign: value as TextAlignType });
            break;
        }

        setTextFormatting((prev) => ({
          ...prev,
          [property]: value,
        }));

        canvas?.renderAll();
      }
    },
    [selectedObject, canvas]
  );

  return { textFormatting, updateTextFormatting };
};
