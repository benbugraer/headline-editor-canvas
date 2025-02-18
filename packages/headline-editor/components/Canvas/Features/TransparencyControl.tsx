// import React from "react";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Slider } from "@/components/ui/slider";
// import { Blend } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface TransparencyControlProps {
//   opacity: number;
//   onOpacityChange: (value: number) => void;
// }

// const TransparencyControl: React.FC<TransparencyControlProps> = ({
//   opacity,
//   onOpacityChange,
// }) => {
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button variant="outline">
//           <Blend strokeWidth={1.5} className="w-4 h-4" />
//           Şeffaflık
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-64 p-4 bg-white shadow-lg rounded-lg">
//         <div className="flex flex-col space-y-2">
//           <div className="flex items-center space-x-4">
//             <span className="text-sm">Şeffaflık:</span>
//             <span className="text-sm font-semibold text-blue-600">
//               {opacity === 100 ? "100%" : `%${opacity.toFixed(0)}`}
//             </span>
//           </div>
//           <Slider
//             value={[opacity]}
//             onValueChange={(value) => onOpacityChange(value[0])}
//             max={100}
//             step={1}
//             className="w-full"
//           />
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// };

// export default TransparencyControl;
