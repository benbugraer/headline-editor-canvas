import { FaFont, FaImage, FaSquare, FaCircle, FaIcons } from "react-icons/fa";

export const SIDEBAR_ITEMS = [
  {
    label: "Dikdörtgen",
    icon: FaSquare,
  },
  {
    label: "Daire",
    icon: FaCircle,
  },
  {
    label: "Metin",
    icon: FaFont,
  },
  {
    label: "Görsel Ekle",
    icon: FaImage,
  },
  {
    label: "İkon Ekle",
    icon: FaIcons,
  },
] as const;
