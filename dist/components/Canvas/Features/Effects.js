"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EffectsDrawer = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var sheet_1 = require("@/components/ui/sheet");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var OpacityControl_1 = require("./OpacityControl");
var ShadowControl_1 = require("./ShadowControl");
var TextStrokeControl_1 = require("./TextStrokeControl");
var ShapeRadiusControl_1 = require("./ShapeRadiusControl");
var useCanvasObject_1 = require("../hooks/useCanvasObject");
var EffectsHeader_1 = require("./EffectsHeader");
var EffectsDrawer = function (_a) {
    var selectedObject = _a.selectedObject, canvas = _a.canvas, onObjectUpdate = _a.onObjectUpdate;
    var _b = (0, useCanvasObject_1.useCanvasObject)(selectedObject, canvas, onObjectUpdate), opacity = _b.opacity, shadow = _b.shadow, textStroke = _b.textStroke, shapeRadius = _b.shapeRadius, handlers = _b.handlers;
    if (!selectedObject || !canvas)
        return null;
    return ((0, jsx_runtime_1.jsxs)(sheet_1.Sheet, { children: [(0, jsx_runtime_1.jsx)(sheet_1.SheetTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", className: "transition-all active:scale-95", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { className: "h-5 w-5 text-gray-600 hover:text-gray-800" }), "Efektler"] }) }), (0, jsx_runtime_1.jsxs)(sheet_1.SheetContent, { side: "right", className: "bg-secondary", children: [(0, jsx_runtime_1.jsx)(EffectsHeader_1.EffectsHeader, { onClose: function () { } }), (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-6 px-6 py-4 overflow-y-auto max-h-[70vh]", children: [(0, jsx_runtime_1.jsx)(OpacityControl_1.OpacityControl, { value: opacity.value, enabled: opacity.enabled, onChange: handlers.handleOpacityChange, onToggle: handlers.handleOpacityToggle }), (0, jsx_runtime_1.jsx)(ShadowControl_1.ShadowControl, { shadow: shadow, onChange: handlers.handleShadowChange }), selectedObject.type === "i-text" && ((0, jsx_runtime_1.jsx)(TextStrokeControl_1.TextStrokeControl, { stroke: textStroke, onChange: handlers.handleTextStrokeChange })), (selectedObject.type === "rect" ||
                                selectedObject.type === "image" ||
                                selectedObject.type === "circle") && ((0, jsx_runtime_1.jsx)(ShapeRadiusControl_1.ShapeRadiusControl, { radius: shapeRadius, onChange: handlers.handleCornerRadiusChange, isCircle: selectedObject.type === "circle" }))] })] })] }));
};
exports.EffectsDrawer = EffectsDrawer;
exports.default = (0, react_1.memo)(exports.EffectsDrawer);
//# sourceMappingURL=Effects.js.map