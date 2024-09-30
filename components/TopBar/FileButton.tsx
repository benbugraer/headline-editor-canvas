import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  //   DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdFolder } from "react-icons/md";
import { AiFillFolderOpen } from "react-icons/ai";
import { BsFiletypeJson } from "react-icons/bs";

export default function FileButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-1 items-center focus:outline-none">
        <MdFolder className="w-6 h-6" /> Dosya
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-4 bg-tertiary">
        <DropdownMenuItem>+ Create new design</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-1">
          <AiFillFolderOpen className="w-5 h-5" /> Open project
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-1">
          <BsFiletypeJson className="w-5 h-5" /> Save as JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
