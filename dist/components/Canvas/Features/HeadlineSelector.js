"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadlineSelector = HeadlineSelector;
var react_1 = __importDefault(require("react"));
var constants_1 = require("../utils/constants");
function HeadlineSelector(_a) {
    var canvas = _a.canvas, onSelect = _a.onSelect;
    var handleSizeSelect = function (width, height) {
        if (!canvas)
            return;
        canvas.setWidth(width);
        canvas.setHeight(height);
        canvas.renderAll();
    };
    return (react_1.default.createElement("div", { className: "" },
        react_1.default.createElement("div", null, Object.values(constants_1.HEADLINE_SIZES).map(function (size) { return (react_1.default.createElement("button", { key: size.label, className: "w-full p-3 text-left hover:bg-tertiary rounded-sm transition-colors", onSelect: onSelect, onClick: function () { return handleSizeSelect(size.width, size.height); } },
            react_1.default.createElement("div", { className: "text-sm font-medium" }, size.label),
            react_1.default.createElement("div", { className: "text-xs text-tertiary" },
                size.width,
                "x",
                size.height,
                "px"))); }))));
}
