import { Input } from "../ui/input";
import DownloadButton from "./DownloadButton";
import FileButton from "./FileButton";

export default function TopBar() {
  return (
    <header className="bg-tertiary  top-0 sticky z-40 w-full backdrop-blur-xl">
      <div className="container flex h-[3rem] items-center">
        <h1 className="relative  text-md font-normal tracking-tighter mr-8 flex items-center">
          <FileButton />
        </h1>
        <nav className="hidden xl:flex items-center space-x-6 text-sm font-medium">
          <ul className="hidden md:flex gap-1 items-center">
            <Input placeholder="Untitled Design" />
          </ul>
        </nav>
        <nav className="flex  items-center gap-1 justify-end ml-auto">
          <DownloadButton />
        </nav>
        <div className="relative md:hidden ml-5"></div>
      </div>
      <hr className="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-200/30 to-neutral-200/0 shadow-2xl"></hr>
    </header>
  );
}
