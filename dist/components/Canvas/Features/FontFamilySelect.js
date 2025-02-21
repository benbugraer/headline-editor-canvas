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
exports.FontFamilySelect = FontFamilySelect;
var React = __importStar(require("react"));
var select_1 = require("@/components/ui/select");
var fonts_1 = require("../lib/fonts");
function FontFamilySelect(_a) {
    var _b;
    var value = _a.value, onValueChange = _a.onValueChange;
    var getCurrentFont = React.useCallback(function (value) {
        return fonts_1.fontFamilies.find(function (font) { return font.family === value || font.name === value; });
    }, []);
    var currentFont = getCurrentFont(value);
    return (React.createElement(select_1.Select, { value: (_b = currentFont === null || currentFont === void 0 ? void 0 : currentFont.name) !== null && _b !== void 0 ? _b : value, onValueChange: onValueChange },
        React.createElement(select_1.SelectTrigger, { className: "w-[180px]" },
            React.createElement(select_1.SelectValue, null, currentFont ? (React.createElement("span", { style: { fontFamily: currentFont.family } }, currentFont.name)) : ("Select font"))),
        React.createElement(select_1.SelectContent, null, fonts_1.fontFamilies.map(function (font) { return (React.createElement(select_1.SelectItem, { key: font.name, value: font.name, style: { fontFamily: font.family } }, font.name)); }))));
}
