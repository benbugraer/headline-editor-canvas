import React from "react";
import * as fabric from "fabric";
interface SettingsProps {
    canvas: fabric.Canvas | null;
}
export default function Settings({ canvas }: SettingsProps): React.JSX.Element;
export {};
