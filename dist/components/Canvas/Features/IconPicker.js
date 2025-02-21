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
exports.IconPicker = IconPicker;
var react_1 = __importStar(require("react"));
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var iconService_1 = require("@/services/iconService");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
function IconPicker(_a) {
    var onIconSelect = _a.onIconSelect;
    var _b = (0, react_1.useState)(""), searchQuery = _b[0], setSearchQuery = _b[1];
    var _c = (0, react_1.useState)((0, iconService_1.searchIcons)("")), icons = _c[0], setIcons = _c[1];
    var handleSearch = function (query) {
        var results = (0, iconService_1.searchIcons)(query);
        setIcons(results);
    };
    return (react_1.default.createElement("div", { className: "" },
        react_1.default.createElement("div", { className: "space-y-2 items-center justify-center text-center" },
            react_1.default.createElement("div", { className: "flex gap-2 mb-4 w-11/12 " },
                react_1.default.createElement(input_1.Input, { placeholder: "\u0130kon Ara", value: searchQuery, onChange: function (e) {
                        setSearchQuery(e.target.value);
                        handleSearch(e.target.value);
                    } })),
            react_1.default.createElement("div", { className: "grid grid-cols-4 gap-2 overflow-y-auto" }, icons.map(function (icon) { return (react_1.default.createElement(button_1.Button, { key: icon.id, className: "h-12 w-12 p-0 bg-tertiary text-primary hover:bg-white duration-150 ease-linear", onClick: function () {
                    var path = icon.icon.icon[4];
                    onIconSelect(path, "#000000");
                } },
                react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: icon.icon, className: "h-6 w-6" }))); })))));
}
