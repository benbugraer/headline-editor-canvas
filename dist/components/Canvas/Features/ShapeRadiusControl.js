"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeRadiusControl = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var slider_1 = require("@/components/ui/slider");
var switch_1 = require("@/components/ui/switch");
var label_1 = require("@/components/ui/label");
exports.ShapeRadiusControl = (0, react_1.memo)(function (_a) {
    var radius = _a.radius, onChange = _a.onChange, isCircle = _a.isCircle;
    var handleRadiusChange = function (value) {
        // Radius değerini 0-140 arasında sınırla
        var clampedValue = Math.max(0, Math.min(140, value));
        onChange({ radius: clampedValue });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-4 bg-gray-50 p-4 rounded-lg", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-gray-700 font-medium", children: isCircle ? "Daire Boyutu" : "Köşe Yuvarlaklığı" }), (0, jsx_runtime_1.jsx)(switch_1.Switch, { checked: radius.enabled, onCheckedChange: function (checked) {
                            onChange({ enabled: checked });
                            if (!checked)
                                handleRadiusChange(0);
                        }, className: "data-[state=checked]:bg-blue-500" })] }), radius.enabled && ((0, jsx_runtime_1.jsx)("div", { className: "space-y-2", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsx)(slider_1.Slider, { value: [radius.radius], onValueChange: function (values) { return handleRadiusChange(values[0]); }, max: 140, step: 1, className: "cursor-pointer" }) }), (0, jsx_runtime_1.jsx)("input", { type: "number", value: radius.radius, onChange: function (e) { return handleRadiusChange(Number(e.target.value)); }, className: "w-16 h-8 border border-gray-300 rounded px-2 text-sm", min: "0", max: "140" })] }) }))] }));
});
exports.ShapeRadiusControl.displayName = "ShapeRadiusControl";
//# sourceMappingURL=ShapeRadiusControl.js.map