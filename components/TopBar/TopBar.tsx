import DownloadButton from "./DownloadButton";
import { Canvas } from "fabric";

interface TopBarProps {
  canvas: Canvas | null;
}

export default function TopBar({ canvas }: TopBarProps) {
  return (
    <header className="flex flex-col bg-secondary">
      <div className="flex h-10 lg:h-14 items-center gap-4 border-b border-primary">
        <div className="flex justify-center items-center gap-2 ml-auto mr-6">
          <DownloadButton canvas={canvas} />
        </div>
      </div>
    </header>
  );
}
