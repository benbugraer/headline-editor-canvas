import React from "react";
import { Button } from "@/components/ui/button";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
} from "react-icons/fa";
import clsx from "clsx";
import { TextFormatting, TextAlignType } from "../types/canvas.types";

interface TextFormattingControlsProps {
  textFormatting: TextFormatting;
  updateTextFormatting: (
    property: keyof TextFormatting,
    value: boolean | TextAlignType
  ) => void;
}

export const TextFormattingControls: React.FC<TextFormattingControlsProps> = ({
  textFormatting,
  updateTextFormatting,
}) => {
  const formatButtons = [
    { id: "bold", icon: FaBold, property: "bold" },
    { id: "italic", icon: FaItalic, property: "italic" },
    { id: "underline", icon: FaUnderline, property: "underline" },
    { id: "strikethrough", icon: FaStrikethrough, property: "strikethrough" },
  ];

  const alignButtons = [
    { id: "left-align", icon: FaAlignLeft, align: "left" },
    { id: "center-align", icon: FaAlignCenter, align: "center" },
    { id: "right-align", icon: FaAlignRight, align: "right" },
    { id: "justify-align", icon: FaAlignJustify, align: "justify" },
  ];

  return (
    <div className="flex items-center space-x-2">
      {formatButtons.map(({ id, icon: Icon, property }) => (
        <Button
          key={id}
          id={`${id}-mode`}
          variant="ghost"
          size="icon"
          className={clsx(
            "bg-transparent hover:bg-none",
            textFormatting[property as keyof TextFormatting] && "bg-tertiary"
          )}
          onClick={() =>
            updateTextFormatting(
              property as keyof TextFormatting,
              !textFormatting[property as keyof TextFormatting]
            )
          }
        >
          <Icon />
        </Button>
      ))}

      {alignButtons.map(({ id, icon: Icon, align }) => (
        <Button
          key={id}
          id={`${id}-mode`}
          variant="ghost"
          size="icon"
          className={clsx(
            "bg-transparent hover:bg-none",
            textFormatting.textAlign === align && "bg-tertiary"
          )}
          onClick={() =>
            updateTextFormatting("textAlign", align as TextAlignType)
          }
        >
          <Icon />
        </Button>
      ))}
    </div>
  );
};
