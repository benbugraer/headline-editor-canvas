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
exports.TextStrokeControl = void 0;
var react_1 = __importStar(require("react"));
var switch_1 = require("../../ui/switch");
var label_1 = require("../../ui/label");
var ColorPicker_1 = require("./ColorPicker");
exports.TextStrokeControl = (0, react_1.memo)(function (_a) {
    var stroke = _a.stroke, onChange = _a.onChange;
    return (react_1.default.createElement("div", { className: "space-y-4 bg-gray-50 p-4 rounded-lg" },
        react_1.default.createElement("div", { className: "flex items-center justify-between" },
            react_1.default.createElement(label_1.Label, { className: "text-gray-700 font-medium" }, "Metin \u00C7izgisi"),
            react_1.default.createElement(switch_1.Switch, { checked: stroke.enabled, onCheckedChange: function (checked) { return onChange({ enabled: checked }); }, className: "data-[state=checked]:bg-blue-500" })),
        stroke.enabled && (react_1.default.createElement("div", { className: "flex items-center space-x-4" },
            react_1.default.createElement("input", { type: "number", value: stroke.width, onChange: function (e) {
                    return onChange({ width: parseFloat(e.target.value) || 0 });
                }, className: "w-16 border border-gray-300 rounded px-2 py-1", min: "0", max: "20" }),
            react_1.default.createElement(ColorPicker_1.ColorPicker, { color: stroke.color, onChange: function (color) { return onChange({ color: color.hex }); } })))));
});
exports.TextStrokeControl.displayName = "TextStrokeControl";
