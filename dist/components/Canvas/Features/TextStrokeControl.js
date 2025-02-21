"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextStrokeControl = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var switch_1 = require("@/components/ui/switch");
var label_1 = require("@/components/ui/label");
var ColorPicker_1 = require("./ColorPicker");
exports.TextStrokeControl = (0, react_1.memo)(function (_a) {
    var stroke = _a.stroke, onChange = _a.onChange;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-4 bg-gray-50 p-4 rounded-lg", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-gray-700 font-medium", children: "Metin \u00C7izgisi" }), (0, jsx_runtime_1.jsx)(switch_1.Switch, { checked: stroke.enabled, onCheckedChange: function (checked) { return onChange({ enabled: checked }); }, className: "data-[state=checked]:bg-blue-500" })] }), stroke.enabled && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4", children: [(0, jsx_runtime_1.jsx)("input", { type: "number", value: stroke.width, onChange: function (e) {
                            return onChange({ width: parseFloat(e.target.value) || 0 });
                        }, className: "w-16 border border-gray-300 rounded px-2 py-1", min: "0", max: "20" }), (0, jsx_runtime_1.jsx)(ColorPicker_1.ColorPicker, { color: stroke.color, onChange: function (color) { return onChange({ color: color.hex }); } })] }))] }));
});
exports.TextStrokeControl.displayName = "TextStrokeControl";
//# sourceMappingURL=TextStrokeControl.js.map