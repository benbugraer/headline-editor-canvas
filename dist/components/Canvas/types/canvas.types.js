"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIDEBAR_ITEMS = void 0;
var pi_1 = require("react-icons/pi");
var vsc_1 = require("react-icons/vsc");
var pi_2 = require("react-icons/pi");
var fa_1 = require("react-icons/fa");
var io5_1 = require("react-icons/io5");
var tb_1 = require("react-icons/tb");
exports.SIDEBAR_ITEMS = [
    {
        label: "Dikdörtgen",
        icon: pi_1.PiRectangleBold,
        action: "rectangle",
    },
    {
        label: "Daire",
        icon: vsc_1.VscCircleLarge,
        action: "circle",
    },
    {
        label: "Metin",
        icon: pi_2.PiTextTFill,
    },
    {
        label: "Görsel Ekle",
        icon: io5_1.IoImageSharp,
    },
    {
        label: "İkon Ekle",
        icon: fa_1.FaFontAwesome,
    },
    {
        label: "Manşet Seç",
        icon: tb_1.TbLayoutGridFilled,
    },
];
