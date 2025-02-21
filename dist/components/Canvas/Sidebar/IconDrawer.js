"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconDrawer = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var sheet_1 = require("@/components/ui/sheet");
var separator_1 = require("@/components/ui/separator");
var IconPicker_1 = require("../Features/IconPicker");
var SidebarButton_1 = require("./SidebarButton");
var IconDrawer = function (_a) {
    var isOpen = _a.isOpen, onOpenChange = _a.onOpenChange, onIconSelect = _a.onIconSelect, item = _a.item;
    return ((0, jsx_runtime_1.jsxs)(sheet_1.Sheet, { open: isOpen, onOpenChange: onOpenChange, children: [(0, jsx_runtime_1.jsx)(sheet_1.SheetTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(SidebarButton_1.SidebarButton, { icon: item.icon, label: item.label }) }) }), (0, jsx_runtime_1.jsxs)(sheet_1.SheetContent, { side: "left", children: [(0, jsx_runtime_1.jsxs)(sheet_1.SheetHeader, { children: [(0, jsx_runtime_1.jsx)(sheet_1.SheetTitle, { children: "\u0130kon Se\u00E7in" }), (0, jsx_runtime_1.jsx)(sheet_1.SheetDescription, { children: "Listeden bir ikon se\u00E7in" })] }), (0, jsx_runtime_1.jsx)(separator_1.Separator, {}), (0, jsx_runtime_1.jsx)("div", { className: "p-4", children: (0, jsx_runtime_1.jsx)(IconPicker_1.IconPicker, { onIconSelect: function (icon) {
                                onIconSelect(icon);
                                onOpenChange(false);
                            } }) })] })] }));
};
exports.IconDrawer = IconDrawer;
//# sourceMappingURL=IconDrawer.js.map