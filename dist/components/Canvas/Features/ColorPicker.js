"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorPicker = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_color_1 = require("react-color");
var popover_1 = require("@/components/ui/popover");
var label_1 = require("@/components/ui/label");
var ColorPicker = function (_a) {
    var color = _a.color, onChange = _a.onChange;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "Renk:" }), (0, jsx_runtime_1.jsxs)(popover_1.Popover, { children: [(0, jsx_runtime_1.jsx)(popover_1.PopoverTrigger, { children: (0, jsx_runtime_1.jsx)("div", { className: "w-6 h-6 rounded-sm cursor-pointer border border-gray-300", style: { backgroundColor: color } }) }), (0, jsx_runtime_1.jsx)(popover_1.PopoverContent, { className: "p-0 w-fit ml-[5.8rem] mt-3", side: "bottom", children: (0, jsx_runtime_1.jsx)(react_color_1.SketchPicker, { color: color, onChange: onChange }) })] })] }));
};
exports.ColorPicker = ColorPicker;
//# sourceMappingURL=ColorPicker.js.map