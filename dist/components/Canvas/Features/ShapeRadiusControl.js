"use strict";
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
exports.ShapeRadiusControl = void 0;
var react_1 = __importStar(require("react"));
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
    return (react_1.default.createElement("div", { className: "space-y-4 bg-gray-50 p-4 rounded-lg" },
        react_1.default.createElement("div", { className: "flex items-center justify-between" },
            react_1.default.createElement(label_1.Label, { className: "text-gray-700 font-medium" }, isCircle ? "Daire Boyutu" : "Köşe Yuvarlaklığı"),
            react_1.default.createElement(switch_1.Switch, { checked: radius.enabled, onCheckedChange: function (checked) {
                    onChange({ enabled: checked });
                    if (!checked)
                        handleRadiusChange(0);
                }, className: "data-[state=checked]:bg-blue-500" })),
        radius.enabled && (react_1.default.createElement("div", { className: "space-y-2" },
            react_1.default.createElement("div", { className: "flex items-center gap-4" },
                react_1.default.createElement("div", { className: "flex-1" },
                    react_1.default.createElement(slider_1.Slider, { value: [radius.radius], onValueChange: function (values) { return handleRadiusChange(values[0]); }, max: 140, step: 1, className: "cursor-pointer" })),
                react_1.default.createElement("input", { type: "number", value: radius.radius, onChange: function (e) { return handleRadiusChange(Number(e.target.value)); }, className: "w-16 h-8 border border-gray-300 rounded px-2 text-sm", min: "0", max: "140" }))))));
});
exports.ShapeRadiusControl.displayName = "ShapeRadiusControl";
