"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.EffectsDrawer = void 0;
var react_1 = __importStar(require("react"));
var sheet_1 = require("../../ui/sheet");
var button_1 = require("../../ui/button");
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
    return (react_1.default.createElement(sheet_1.Sheet, null,
        react_1.default.createElement(sheet_1.SheetTrigger, { asChild: true },
            react_1.default.createElement(button_1.Button, { variant: "outline", className: "transition-all active:scale-95" },
                react_1.default.createElement(lucide_react_1.Sparkles, { className: "h-5 w-5 text-gray-600 hover:text-gray-800" }),
                "Efektler")),
        react_1.default.createElement(sheet_1.SheetContent, { side: "right", className: "bg-secondary" },
            react_1.default.createElement(EffectsHeader_1.EffectsHeader, { onClose: function () { } }),
            react_1.default.createElement("div", { className: "grid gap-6 px-6 py-4 overflow-y-auto max-h-[70vh]" },
                react_1.default.createElement(OpacityControl_1.OpacityControl, { value: opacity.value, enabled: opacity.enabled, onChange: handlers.handleOpacityChange, onToggle: handlers.handleOpacityToggle }),
                react_1.default.createElement(ShadowControl_1.ShadowControl, { shadow: shadow, onChange: handlers.handleShadowChange }),
                selectedObject.type === "i-text" && (react_1.default.createElement(TextStrokeControl_1.TextStrokeControl, { stroke: textStroke, onChange: handlers.handleTextStrokeChange })),
                (selectedObject.type === "rect" ||
                    selectedObject.type === "image" ||
                    selectedObject.type === "circle") && (react_1.default.createElement(ShapeRadiusControl_1.ShapeRadiusControl, { radius: shapeRadius, onChange: handlers.handleCornerRadiusChange, isCircle: selectedObject.type === "circle" }))))));
};
exports.EffectsDrawer = EffectsDrawer;
exports.default = (0, react_1.memo)(exports.EffectsDrawer);
