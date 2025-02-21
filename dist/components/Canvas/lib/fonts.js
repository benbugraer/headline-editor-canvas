"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fontFamilies = void 0;
exports.loadFonts = loadFonts;
exports.fontFamilies = [
    {
        name: "Arial",
        family: "Arial, sans-serif",
        url: "",
    },
    {
        name: "Times New Roman",
        family: "Times New Roman, serif",
        url: "",
    },
    {
        name: "Helvetica",
        family: "Helvetica, sans-serif",
        url: "",
    },
    {
        name: "Georgia",
        family: "Georgia, serif",
        url: "",
    },
    {
        name: "Roboto",
        family: "Roboto, sans-serif",
        url: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",
    },
    {
        name: "Open Sans",
        family: "Open Sans, sans-serif",
        url: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap",
    },
    {
        name: "Lato",
        family: "Lato, sans-serif",
        url: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap",
    },
    {
        name: "Montserrat",
        family: "Montserrat, sans-serif",
        url: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap",
    },
    {
        name: "Raleway",
        family: "Raleway, sans-serif",
        url: "https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap",
    },
    {
        name: "Ubuntu",
        family: "Ubuntu, sans-serif",
        url: "https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap",
    },
    {
        name: "Playfair Display",
        family: "Playfair Display, serif",
        url: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap",
    },
    {
        name: "Merriweather",
        family: "Merriweather, serif",
        url: "https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap",
    },
    {
        name: "Source Sans",
        family: "Source Sans 3, sans-serif",
        url: "https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap",
    },
    {
        name: "Poppins",
        family: "Poppins, sans-serif",
        url: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",
    },
];
function loadFonts() {
    exports.fontFamilies
        .filter(function (font) { return font.url; })
        .forEach(function (font) {
        var link = document.createElement("link");
        link.href = font.url;
        link.rel = "stylesheet";
        document.head.appendChild(link);
    });
}
