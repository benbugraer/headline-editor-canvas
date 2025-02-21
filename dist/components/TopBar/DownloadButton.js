"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var button_1 = require("../ui/button");
var dropdown_menu_1 = require("../ui/dropdown-menu");
var slider_1 = require("../ui/slider");
var fa_1 = require("react-icons/fa");
var DownloadButton = function (_a) {
    var canvas = _a.canvas, fileName = _a.fileName;
    var _b = (0, react_1.useState)(90), quality = _b[0], setQuality = _b[1];
    var _c = (0, react_1.useState)(2), multiplier = _c[0], setMultiplier = _c[1];
    var handleDownload = function () {
        if (!canvas) {
            console.warn("Canvas is not available");
            return;
        }
        var dataURL = canvas.toDataURL({
            format: "jpeg",
            quality: quality / 100,
            multiplier: multiplier,
        });
        var link = document.createElement("a");
        link.href = dataURL;
        link.download = "".concat(fileName, ".jpg");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (react_1.default.createElement(dropdown_menu_1.DropdownMenu, null,
        react_1.default.createElement(dropdown_menu_1.DropdownMenuTrigger, { asChild: true },
            react_1.default.createElement(button_1.Button, { className: "bg-primaryBlue rounded-md focus:outline-none text-white hover:bg-tertiary hover:text-primary ease-linear duration-200 gap-2" },
                react_1.default.createElement(fa_1.FaDownload, { className: "h-4 w-4" }),
                " G\u00F6rseli Kaydet")),
        react_1.default.createElement(dropdown_menu_1.DropdownMenuContent, { className: "w-56 bg-secondary" },
            react_1.default.createElement("div", { className: "px-2 py-1.5" },
                react_1.default.createElement("label", { className: "text-sm font-medium" },
                    "Kalite: ",
                    quality,
                    "%"),
                react_1.default.createElement(slider_1.Slider, { className: "mt-2", min: 1, max: 100, step: 1, value: [quality], onValueChange: function (value) { return setQuality(value[0]); } })),
            react_1.default.createElement("div", { className: "px-2 py-1.5" },
                react_1.default.createElement("label", { className: "text-sm font-medium" },
                    "\u00C7\u00F6z\u00FCn\u00FCrl\u00FCk: ",
                    multiplier,
                    "x"),
                react_1.default.createElement(slider_1.Slider, { className: "mt-2", min: 1, max: 4, step: 0.5, value: [multiplier], onValueChange: function (value) { return setMultiplier(value[0]); } })),
            react_1.default.createElement(dropdown_menu_1.DropdownMenuSeparator, null),
            react_1.default.createElement(dropdown_menu_1.DropdownMenuItem, null,
                react_1.default.createElement(button_1.Button, { className: "w-full inline-block bg-primaryBlue text-white hover:bg-tertiary hover:text-primary ease-linear duration-200", variant: "outline", onClick: handleDownload }, "Kaydet")))));
};
exports.default = DownloadButton;
