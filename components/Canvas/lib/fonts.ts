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

// Font loader configurations
export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
});

export const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

export const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export type FontFamily = {
  name: string;
  family: string;
};

export const fontFamilies: FontFamily[] = [
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
