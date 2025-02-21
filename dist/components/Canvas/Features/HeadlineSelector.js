"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadlineSelector = HeadlineSelector;
var jsx_runtime_1 = require("react/jsx-runtime");
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
    return ((0, jsx_runtime_1.jsx)("div", { className: "", children: (0, jsx_runtime_1.jsx)("div", { children: Object.values(constants_1.HEADLINE_SIZES).map(function (size) { return ((0, jsx_runtime_1.jsxs)("button", { className: "w-full p-3 text-left hover:bg-tertiary rounded-sm transition-colors", onSelect: onSelect, onClick: function () { return handleSizeSelect(size.width, size.height); }, children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm font-medium", children: size.label }), (0, jsx_runtime_1.jsxs)("div", { className: "text-xs text-tertiary", children: [size.width, "x", size.height, "px"] })] }, size.label)); }) }) }));
}
//# sourceMappingURL=HeadlineSelector.js.map