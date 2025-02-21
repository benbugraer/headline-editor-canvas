import React from "react";
interface IconPickerProps {
    onIconSelect: (iconPath: string, color: string) => void;
}
export declare function IconPicker({ onIconSelect }: IconPickerProps): React.JSX.Element;
export {};
