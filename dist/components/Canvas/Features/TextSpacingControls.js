"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextSpacingControls = TextSpacingControls;
var jsx_runtime_1 = require("react/jsx-runtime");
var popover_1 = require("@/components/ui/popover");
var label_1 = require("@/components/ui/label");
var slider_1 = require("@/components/ui/slider");
var input_1 = require("@/components/ui/input");
var fa_1 = require("react-icons/fa");
var button_1 = require("@/components/ui/button");
function TextSpacingControls(_a) {
    var lineHeight = _a.lineHeight, _b = _a.letterSpacing, letterSpacing = _b === void 0 ? 0 : _b, onLineHeightChange = _a.onLineHeightChange, onLetterSpacingChange = _a.onLetterSpacingChange;
    var handleLetterSpacingInputChange = function (e) {
        var value = parseInt(e.target.value);
        if (!isNaN(value) && value >= -50 && value <= 250) {
            onLetterSpacingChange(value);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(popover_1.Popover, { children: [(0, jsx_runtime_1.jsx)(popover_1.PopoverTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "icon", children: (0, jsx_runtime_1.jsx)(fa_1.FaTextHeight, { className: "h-4 w-4" }) }) }), (0, jsx_runtime_1.jsx)(popover_1.PopoverContent, { className: "w-80", children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "Sat\u0131r Aral\u0131\u011F\u0131" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-foreground", children: lineHeight.toFixed(1) })] }), (0, jsx_runtime_1.jsx)(slider_1.Slider, { value: [lineHeight], min: 0.5, max: 12, step: 0.1, onValueChange: function (value) { return onLineHeightChange(value[0]); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "Harf Aral\u0131\u011F\u0131" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { type: "number", value: letterSpacing, onChange: handleLetterSpacingInputChange, className: "w-[70px]", min: -50, max: 250 }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-foreground", children: "px" })] })] }), (0, jsx_runtime_1.jsx)(slider_1.Slider, { value: [letterSpacing], min: -50, max: 250, step: 1, onValueChange: function (value) { return onLetterSpacingChange(value[0]); } })] })] }) })] }));
}
//# sourceMappingURL=TextSpacingControls.js.map