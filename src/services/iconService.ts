import { IconDefinition, library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

// Font Awesome kütüphanesini yükle
library.add(fas, fab);

export interface IconResult {
  id: string;
  icon: IconDefinition;
  type: "solid" | "brand";
}

export const searchIcons = (query: string): IconResult[] => {
  const allIcons: IconResult[] = [
    ...Object.entries(fas).map(([name, icon]) => ({
      id: name,
      icon: icon as IconDefinition,
      type: "solid" as const,
    })),
    ...Object.entries(fab).map(([name, icon]) => ({
      id: name,
      icon: icon as IconDefinition,
      type: "brand" as const,
    })),
  ];

  if (!query) {
    return allIcons.slice(0, 52); // İlk 28 ikonu göster
  }

  return allIcons
    .filter((item) => item.id.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 45);
};
