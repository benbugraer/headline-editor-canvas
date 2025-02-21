"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DimensionInputs = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var DimensionInputs = function (_a) {
    var objectType = _a.objectType, width = _a.width, height = _a.height, diameter = _a.diameter, onWidthChange = _a.onWidthChange, onHeightChange = _a.onHeightChange, onDiameterChange = _a.onDiameterChange;
    if (objectType === "rect" || objectType === "image") {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "width", children: "W:" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "width", value: width, onChange: onWidthChange, className: "w-20" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "height", children: "H:" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "height", value: height, onChange: onHeightChange, className: "w-20" })] })] }));
    }
    if (objectType === "circle") {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "diameter", children: "\u00C7ap:" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "diameter", value: diameter, onChange: onDiameterChange, className: "w-20" })] }));
    }
    return null;
};
exports.DimensionInputs = DimensionInputs;
//# sourceMappingURL=DimensionInputs.js.map