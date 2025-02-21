"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShadowControl = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
// ShadowControl.tsx
var react_1 = require("react");
var slider_1 = require("@/components/ui/slider");
var switch_1 = require("@/components/ui/switch");
var label_1 = require("@/components/ui/label");
var ColorPicker_1 = require("./ColorPicker");
exports.ShadowControl = (0, react_1.memo)(function (_a) {
    var shadow = _a.shadow, onChange = _a.onChange;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-4 bg-gray-50 p-4 rounded-lg", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-gray-700 font-medium", children: "G\u00F6lge Efekti" }), (0, jsx_runtime_1.jsx)(switch_1.Switch, { checked: shadow.enabled, onCheckedChange: function (checked) { return onChange({ enabled: checked }); }, className: "data-[state=checked]:bg-blue-500" })] }), shadow.enabled && ((0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-gray-600 text-sm", children: "Bulan\u0131kl\u0131k" }), (0, jsx_runtime_1.jsx)(slider_1.Slider, { value: [shadow.blur], onValueChange: function (values) { return onChange({ blur: values[0] }); }, max: 50, step: 1 })] }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-2", children: (0, jsx_runtime_1.jsx)(ColorPicker_1.ColorPicker, { color: shadow.color, onChange: function (color) { return onChange({ color: color.hex }); } }) }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-gray-600 text-sm", children: "X Kayd\u0131rma" }), (0, jsx_runtime_1.jsx)(slider_1.Slider, { value: [shadow.offsetX], onValueChange: function (values) { return onChange({ offsetX: values[0] }); }, min: -20, max: 20, step: 1 })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-gray-600 text-sm", children: "Y Kayd\u0131rma" }), (0, jsx_runtime_1.jsx)(slider_1.Slider, { value: [shadow.offsetY], onValueChange: function (values) { return onChange({ offsetY: values[0] }); }, min: -20, max: 20, step: 1 })] })] }))] }));
});
exports.ShadowControl.displayName = "ShadowControl";
//# sourceMappingURL=ShadowControl.js.map