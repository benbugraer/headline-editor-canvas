import CanvasNavigation from "./CanvasNavigation";
import FileButton from "../TopBar/FileButton";

export default function Sidebar() {
  return (
    <div className="lg:block hidden h-full">
      <div className="flex h-full max-h-screen flex-col">
        <div className="flex h-[3.438rem] items-center justify-between border-b border-primary px-6 w-full">
          <FileButton />
        </div>
        <CanvasNavigation />
        <div></div>
      </div>
    </div>
  );
}
