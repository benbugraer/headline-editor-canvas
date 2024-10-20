import { ReactNode } from "react";
import DownloadButton from "./DownloadButton";

export default function TopBar({ children }: { children: ReactNode }) {
  return (
    <header className="flex flex-col">
      <div className="flex h-10 lg:h-14 items-center gap-4 border-b border-primary px-3">
        <div className="flex justify-center items-center gap-2 ml-auto mr-6">
          <DownloadButton />
        </div>
      </div>
      {children}
    </header>
  );
}
