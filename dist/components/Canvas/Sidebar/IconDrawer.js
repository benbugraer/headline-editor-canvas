"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconDrawer = void 0;
var react_1 = __importDefault(require("react"));
var sheet_1 = require("@/components/ui/sheet");
var separator_1 = require("@/components/ui/separator");
var IconPicker_1 = require("../Features/IconPicker");
var SidebarButton_1 = require("./SidebarButton");
var IconDrawer = function (_a) {
    var isOpen = _a.isOpen, onOpenChange = _a.onOpenChange, onIconSelect = _a.onIconSelect, item = _a.item;
    return (react_1.default.createElement(sheet_1.Sheet, { open: isOpen, onOpenChange: onOpenChange },
        react_1.default.createElement(sheet_1.SheetTrigger, { asChild: true },
            react_1.default.createElement("div", null,
                react_1.default.createElement(SidebarButton_1.SidebarButton, { icon: item.icon, label: item.label }))),
        react_1.default.createElement(sheet_1.SheetContent, { side: "left" },
            react_1.default.createElement(sheet_1.SheetHeader, null,
                react_1.default.createElement(sheet_1.SheetTitle, null, "\u0130kon Se\u00E7in"),
                react_1.default.createElement(sheet_1.SheetDescription, null, "Listeden bir ikon se\u00E7in")),
            react_1.default.createElement(separator_1.Separator, null),
            react_1.default.createElement("div", { className: "p-4" },
                react_1.default.createElement(IconPicker_1.IconPicker, { onIconSelect: function (icon) {
                        onIconSelect(icon);
                        onOpenChange(false);
                    } })))));
};
exports.IconDrawer = IconDrawer;
