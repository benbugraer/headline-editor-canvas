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
exports.OpacityControl = void 0;
// OpacityControl.tsx
var react_1 = __importStar(require("react"));
var slider_1 = require("@/components/ui/slider");
var switch_1 = require("@/components/ui/switch");
var label_1 = require("@/components/ui/label");
exports.OpacityControl = (0, react_1.memo)(function (_a) {
    var value = _a.value, enabled = _a.enabled, onChange = _a.onChange, onToggle = _a.onToggle;
    return (react_1.default.createElement("div", { className: "space-y-4 bg-gray-50 p-4 rounded-lg" },
        react_1.default.createElement("div", { className: "flex items-center justify-between" },
            react_1.default.createElement(label_1.Label, { className: "text-gray-700 font-medium" }, "Opakl\u0131k"),
            react_1.default.createElement(switch_1.Switch, { checked: enabled, onCheckedChange: onToggle, className: "data-[state=checked]:bg-blue-500" })),
        enabled && (react_1.default.createElement(slider_1.Slider, { value: [value], onValueChange: function (values) { return onChange(values[0]); }, max: 100, step: 1, className: "mt-2" }))));
});
exports.OpacityControl.displayName = "OpacityControl";
