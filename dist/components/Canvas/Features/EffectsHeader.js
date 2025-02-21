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
exports.EffectsHeader = void 0;
var react_1 = __importStar(require("react"));
var sheet_1 = require("@/components/ui/sheet");
exports.EffectsHeader = (0, react_1.memo)(function (_a) { return (react_1.default.createElement(sheet_1.SheetHeader, { className: "flex items-center justify-between border-b border-gray-200 pb-4" },
    react_1.default.createElement("div", null,
        react_1.default.createElement(sheet_1.SheetTitle, { className: "text-xl font-bold text-gray-800" }, "Nesne Efektleri"),
        react_1.default.createElement(sheet_1.SheetDescription, { className: "text-gray-500 mt-1" }, "Se\u00E7ili nesnenin g\u00F6rsel \u00F6zelliklerini \u00F6zelle\u015Ftirin")))); });
exports.EffectsHeader.displayName = "EffectsHeader";
