import CanvasNavigation from "./CanvasNavigation";
import FileButton from "../TopBar/FileButton";
import Link from "next/link";
import clsx from "clsx";

export default function Sidebar() {
  return (
    <div className="lg:block hidden border-r h-full">
      <div className="flex h-full max-h-screen flex-col gap-2 ">
        <div className="flex h-[55px] items-center justify-between border-b px-3 w-full">
          <FileButton />
        </div>
        <div className="flex-1 overflow-auto py-2 ">
          <nav className="grid items-start px-4 text-sm font-medium">
            {/* <CanvasNavigation /> */}
          </nav>
        </div>
      </div>
    </div>
  );
}
