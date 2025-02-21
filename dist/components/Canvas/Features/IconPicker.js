"use strict";
// import React, { useState } from "react";
// import { Button } from "../../ui/button";
// import { Input } from "../../ui/input";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// interface IconPickerProps {
//   onIconSelect: (iconPath: string, color: string) => void;
// }
// export function IconPicker({ onIconSelect }: IconPickerProps) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [icons, setIcons] = useState(searchIcons(""));
//   const handleSearch = (query: string) => {
//     const results = searchIcons(query);
//     setIcons(results);
//   };
//   return (
//     <div className="">
//       <div className="space-y-2 items-center justify-center text-center">
//         <div className="flex gap-2 mb-4 w-11/12 ">
//           <Input
//             placeholder="İkon Ara"
//             value={searchQuery}
//             onChange={(e) => {
//               setSearchQuery(e.target.value);
//               handleSearch(e.target.value);
//             }}
//           />
//         </div>
//         <div className="grid grid-cols-4 gap-2 overflow-y-auto">
//           {icons.map((icon) => (
//             <Button
//               key={icon.id}
//               className="h-12 w-12 p-0 bg-tertiary text-primary hover:bg-white duration-150 ease-linear"
//               onClick={() => {
//                 const path = icon.icon.icon[4] as string;
//                 onIconSelect(path, "#000000");
//               }}
//             >
//               <FontAwesomeIcon icon={icon.icon} className="h-6 w-6" />
//             </Button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
