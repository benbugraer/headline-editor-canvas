"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadlineDrawer = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var sheet_1 = require("@/components/ui/sheet");
var separator_1 = require("@/components/ui/separator");
var HeadlineSelector_1 = require("../Features/HeadlineSelector");
var SidebarButton_1 = require("./SidebarButton");
var HeadlineDrawer = function (_a) {
    var isOpen = _a.isOpen, onOpenChange = _a.onOpenChange, canvas = _a.canvas, item = _a.item;
    return ((0, jsx_runtime_1.jsxs)(sheet_1.Sheet, { open: isOpen, onOpenChange: onOpenChange, children: [(0, jsx_runtime_1.jsx)(sheet_1.SheetTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(SidebarButton_1.SidebarButton, { icon: item.icon, label: item.label }) }) }), (0, jsx_runtime_1.jsxs)(sheet_1.SheetContent, { side: "left", children: [(0, jsx_runtime_1.jsxs)(sheet_1.SheetHeader, { children: [(0, jsx_runtime_1.jsx)(sheet_1.SheetTitle, { children: "Man\u015Fet Se\u00E7in" }), (0, jsx_runtime_1.jsx)(sheet_1.SheetDescription, { className: "text-tertiary", children: "Olu\u015Fturmak istedi\u011Finiz man\u015Fet t\u00FCr\u00FCn\u00FC ve \u00F6l\u00E7\u00FCs\u00FCn\u00FC se\u00E7in." })] }), (0, jsx_runtime_1.jsx)(separator_1.Separator, {}), (0, jsx_runtime_1.jsx)(HeadlineSelector_1.HeadlineSelector, { canvas: canvas, onSelect: function () { return onOpenChange(false); } })] })] }));
};
exports.HeadlineDrawer = HeadlineDrawer;
//# sourceMappingURL=HeadlineDrawer.js.map