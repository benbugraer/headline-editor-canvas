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
exports.ShadowControl = void 0;
// ShadowControl.tsx
var react_1 = __importStar(require("react"));
var slider_1 = require("../../ui/slider");
var switch_1 = require("../../ui/switch");
var label_1 = require("../../ui/label");
var ColorPicker_1 = require("./ColorPicker");
exports.ShadowControl = (0, react_1.memo)(function (_a) {
    var shadow = _a.shadow, onChange = _a.onChange;
    return (react_1.default.createElement("div", { className: "space-y-4 bg-gray-50 p-4 rounded-lg" },
        react_1.default.createElement("div", { className: "flex items-center justify-between" },
            react_1.default.createElement(label_1.Label, { className: "text-gray-700 font-medium" }, "G\u00F6lge Efekti"),
            react_1.default.createElement(switch_1.Switch, { checked: shadow.enabled, onCheckedChange: function (checked) { return onChange({ enabled: checked }); }, className: "data-[state=checked]:bg-blue-500" })),
        shadow.enabled && (react_1.default.createElement("div", { className: "grid grid-cols-2 gap-4" },
            react_1.default.createElement("div", { className: "space-y-2" },
                react_1.default.createElement(label_1.Label, { className: "text-gray-600 text-sm" }, "Bulan\u0131kl\u0131k"),
                react_1.default.createElement(slider_1.Slider, { value: [shadow.blur], onValueChange: function (values) { return onChange({ blur: values[0] }); }, max: 50, step: 1 })),
            react_1.default.createElement("div", { className: "space-y-2" },
                react_1.default.createElement(ColorPicker_1.ColorPicker, { color: shadow.color, onChange: function (color) { return onChange({ color: color.hex }); } })),
            react_1.default.createElement("div", { className: "space-y-2" },
                react_1.default.createElement(label_1.Label, { className: "text-gray-600 text-sm" }, "X Kayd\u0131rma"),
                react_1.default.createElement(slider_1.Slider, { value: [shadow.offsetX], onValueChange: function (values) { return onChange({ offsetX: values[0] }); }, min: -20, max: 20, step: 1 })),
            react_1.default.createElement("div", { className: "space-y-2" },
                react_1.default.createElement(label_1.Label, { className: "text-gray-600 text-sm" }, "Y Kayd\u0131rma"),
                react_1.default.createElement(slider_1.Slider, { value: [shadow.offsetY], onValueChange: function (values) { return onChange({ offsetY: values[0] }); }, min: -20, max: 20, step: 1 }))))));
});
exports.ShadowControl.displayName = "ShadowControl";
