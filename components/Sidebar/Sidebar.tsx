import React from "react";
import { Button } from "@/components/ui/button";
import {
  Folder,
  FileText,
  Image,
  //   Icons,
  Shapes,
  Upload,
  Video,
  Layers,
  Maximize2,
  Quote,
  QrCode,
  Sparkles,
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { icon: Folder, label: "My Designs" },
    { icon: FileText, label: "Templates" },
    { icon: FileText, label: "Text" },
    { icon: Image, label: "Photos" },
    // { icon: Icons, label: "Icons" },
    { icon: Shapes, label: "Shapes" },
    { icon: Upload, label: "Upload" },
    { icon: Video, label: "Videos" },
    { icon: Layers, label: "Background" },
    { icon: Layers, label: "Layers" },
    { icon: Maximize2, label: "Resize" },
    { icon: Quote, label: "Quotes" },
    { icon: QrCode, label: "QR code" },
    { icon: Sparkles, label: "AI Img" },
  ];

  return (
    <div className="w-40 h-screen bg-tertiary flex flex-col border border-primary">
      <div className="flex-grow overflow-y-auto">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start px-4 py-2 text-left hover:bg-tertiary"
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
