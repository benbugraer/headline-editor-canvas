import React from "react";
import { Canvas as FabricCanvas } from "fabric";
interface SidebarProps {
    canvas: FabricCanvas | null;
}
export default function Sidebar({ canvas }: SidebarProps): React.JSX.Element;
export {};
