import { ReactNode } from "react";
import DownloadButton from "./DownloadButton";
import { Canvas } from "fabric";

interface TopBarProps {
  children: ReactNode;
  canvas: Canvas | null;
}

export default function TopBar({ children, canvas }: TopBarProps) {
  return (
    <header className="flex flex-col">
      <div className="flex h-10 lg:h-14 items-center gap-4 border-b border-primary px-3">
        <div className="flex justify-center items-center gap-2 ml-auto mr-6">
          <DownloadButton canvas={canvas} />
        </div>
      </div>
      {children}
    </header>
  );
}
