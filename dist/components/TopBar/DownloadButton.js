"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
var slider_1 = require("@/components/ui/slider");
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
    return ((0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "bg-primaryBlue rounded-md focus:outline-none text-white hover:bg-tertiary hover:text-primary ease-linear duration-200 gap-2", children: [(0, jsx_runtime_1.jsx)(fa_1.FaDownload, { className: "h-4 w-4" }), " G\u00F6rseli Kaydet"] }) }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuContent, { className: "w-56 bg-secondary", children: [(0, jsx_runtime_1.jsxs)("div", { className: "px-2 py-1.5", children: [(0, jsx_runtime_1.jsxs)("label", { className: "text-sm font-medium", children: ["Kalite: ", quality, "%"] }), (0, jsx_runtime_1.jsx)(slider_1.Slider, { className: "mt-2", min: 1, max: 100, step: 1, value: [quality], onValueChange: function (value) { return setQuality(value[0]); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "px-2 py-1.5", children: [(0, jsx_runtime_1.jsxs)("label", { className: "text-sm font-medium", children: ["\u00C7\u00F6z\u00FCn\u00FCrl\u00FCk: ", multiplier, "x"] }), (0, jsx_runtime_1.jsx)(slider_1.Slider, { className: "mt-2", min: 1, max: 4, step: 0.5, value: [multiplier], onValueChange: function (value) { return setMultiplier(value[0]); } })] }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuSeparator, {}), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { children: (0, jsx_runtime_1.jsx)(button_1.Button, { className: "w-full inline-block bg-primaryBlue text-white hover:bg-tertiary hover:text-primary ease-linear duration-200", variant: "outline", onClick: handleDownload, children: "Kaydet" }) })] })] }));
};
exports.default = DownloadButton;
//# sourceMappingURL=DownloadButton.js.map