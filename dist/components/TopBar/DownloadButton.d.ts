import React from "react";
import { Canvas } from "fabric";
interface DownloadButtonProps {
    canvas: Canvas | null;
    fileName: string;
}
declare const DownloadButton: React.FC<DownloadButtonProps>;
export default DownloadButton;
