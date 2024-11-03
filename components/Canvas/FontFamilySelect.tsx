import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Roboto,
  Open_Sans,
  Lato,
  Montserrat,
  Raleway,
  Ubuntu,
  Playfair_Display,
  Merriweather,
  Source_Sans_3,
  Poppins,
} from "next/font/google";

// Font configurations
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// Font families array with both system and Google fonts
export const fontFamilies = [
  {
    name: "Arial",
    family: "Arial, sans-serif",
  },
  {
    name: "Times New Roman",
    family: "Times New Roman, serif",
  },
  {
    name: "Helvetica",
    family: "Helvetica, sans-serif",
  },
  {
    name: "Georgia",
    family: "Georgia, serif",
  },
  {
    name: "Roboto",
    family: roboto.style.fontFamily,
  },
  {
    name: "Open Sans",
    family: openSans.style.fontFamily,
  },
  {
    name: "Lato",
    family: lato.style.fontFamily,
  },
  {
    name: "Montserrat",
    family: montserrat.style.fontFamily,
  },
  {
    name: "Raleway",
    family: raleway.style.fontFamily,
  },
  {
    name: "Ubuntu",
    family: ubuntu.style.fontFamily,
  },
  {
    name: "Playfair Display",
    family: playfairDisplay.style.fontFamily,
  },
  {
    name: "Merriweather",
    family: merriweather.style.fontFamily,
  },
  {
    name: "Source Sans",
    family: sourceSans.style.fontFamily,
  },
  {
    name: "Poppins",
    family: poppins.style.fontFamily,
  },
];

interface FontFamilySelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function FontFamilySelect({
  value,
  onValueChange,
}: FontFamilySelectProps) {
  const currentFontName =
    fontFamilies.find((font) => font.family === value || font.name === value)
      ?.name || value;
  return (
    <Select value={currentFontName} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue>
          {currentFontName ? (
            <span
              style={{
                fontFamily: fontFamilies.find((f) => f.name === currentFontName)
                  ?.family,
              }}
            >
              {currentFontName}
            </span>
          ) : (
            "Select font"
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {fontFamilies.map((font) => (
          <SelectItem
            key={font.name}
            value={font.name}
            style={{ fontFamily: font.family }}
          >
            {font.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
