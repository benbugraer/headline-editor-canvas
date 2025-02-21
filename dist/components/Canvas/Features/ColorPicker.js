"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorPicker = void 0;
var react_1 = __importDefault(require("react"));
var react_color_1 = require("react-color");
var popover_1 = require("@/components/ui/popover");
var label_1 = require("@/components/ui/label");
var ColorPicker = function (_a) {
    var color = _a.color, onChange = _a.onChange;
    return (react_1.default.createElement("div", { className: "flex items-center space-x-2" },
        react_1.default.createElement(label_1.Label, null, "Renk:"),
        react_1.default.createElement(popover_1.Popover, null,
            react_1.default.createElement(popover_1.PopoverTrigger, null,
                react_1.default.createElement("div", { className: "w-6 h-6 rounded-sm cursor-pointer border border-gray-300", style: { backgroundColor: color } })),
            react_1.default.createElement(popover_1.PopoverContent, { className: "p-0 w-fit ml-[5.8rem] mt-3", side: "bottom" },
                react_1.default.createElement(react_color_1.SketchPicker, { color: color, onChange: onChange })))));
};
exports.ColorPicker = ColorPicker;
