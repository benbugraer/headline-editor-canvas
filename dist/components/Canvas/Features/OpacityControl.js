"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpacityControl = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
// OpacityControl.tsx
var react_1 = require("react");
var slider_1 = require("@/components/ui/slider");
var switch_1 = require("@/components/ui/switch");
var label_1 = require("@/components/ui/label");
exports.OpacityControl = (0, react_1.memo)(function (_a) {
    var value = _a.value, enabled = _a.enabled, onChange = _a.onChange, onToggle = _a.onToggle;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-4 bg-gray-50 p-4 rounded-lg", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-gray-700 font-medium", children: "Opakl\u0131k" }), (0, jsx_runtime_1.jsx)(switch_1.Switch, { checked: enabled, onCheckedChange: onToggle, className: "data-[state=checked]:bg-blue-500" })] }), enabled && ((0, jsx_runtime_1.jsx)(slider_1.Slider, { value: [value], onValueChange: function (values) { return onChange(values[0]); }, max: 100, step: 1, className: "mt-2" }))] }));
});
exports.OpacityControl.displayName = "OpacityControl";
//# sourceMappingURL=OpacityControl.js.map