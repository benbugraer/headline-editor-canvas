// import React from "react";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "../../ui/sheet";
// import { Separator } from "../../ui/separator";
// import { IconPicker } from "../Features/IconPicker";
// import { SidebarButton } from "./SidebarButton";
// import { IconType } from "react-icons";

// interface IconDrawerProps {
//   isOpen: boolean;
//   onOpenChange: (open: boolean) => void;
//   onIconSelect: (icon: string) => void;
//   item: {
//     icon: IconType;
//     label: string;
//   };
// }

// export const IconDrawer: React.FC<IconDrawerProps> = ({
//   isOpen,
//   onOpenChange,
//   onIconSelect,
//   item,
// }) => {
//   return (
//     <Sheet open={isOpen} onOpenChange={onOpenChange}>
//       <SheetTrigger asChild>
//         <div>
//           <SidebarButton icon={item.icon} label={item.label} />
//         </div>
//       </SheetTrigger>
//       <SheetContent side="left">
//         <SheetHeader>
//           <SheetTitle>İkon Seçin</SheetTitle>
//           <SheetDescription>Listeden bir ikon seçin</SheetDescription>
//         </SheetHeader>
//         <Separator />
//         <div className="p-4">
//           <IconPicker
//             onIconSelect={(icon) => {
//               onIconSelect(icon);
//               onOpenChange(false);
//             }}
//           />
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// };
