"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadlineDrawer = void 0;
var react_1 = __importDefault(require("react"));
var sheet_1 = require("../../ui/sheet");
var separator_1 = require("../../ui/separator");
var HeadlineSelector_1 = require("../Features/HeadlineSelector");
var SidebarButton_1 = require("./SidebarButton");
var HeadlineDrawer = function (_a) {
    var isOpen = _a.isOpen, onOpenChange = _a.onOpenChange, canvas = _a.canvas, item = _a.item;
    return (react_1.default.createElement(sheet_1.Sheet, { open: isOpen, onOpenChange: onOpenChange },
        react_1.default.createElement(sheet_1.SheetTrigger, { asChild: true },
            react_1.default.createElement("div", null,
                react_1.default.createElement(SidebarButton_1.SidebarButton, { icon: item.icon, label: item.label }))),
        react_1.default.createElement(sheet_1.SheetContent, { side: "left" },
            react_1.default.createElement(sheet_1.SheetHeader, null,
                react_1.default.createElement(sheet_1.SheetTitle, null, "Man\u015Fet Se\u00E7in"),
                react_1.default.createElement(sheet_1.SheetDescription, { className: "text-tertiary" }, "Olu\u015Fturmak istedi\u011Finiz man\u015Fet t\u00FCr\u00FCn\u00FC ve \u00F6l\u00E7\u00FCs\u00FCn\u00FC se\u00E7in.")),
            react_1.default.createElement(separator_1.Separator, null),
            react_1.default.createElement(HeadlineSelector_1.HeadlineSelector, { canvas: canvas, onSelect: function () { return onOpenChange(false); } }))));
};
exports.HeadlineDrawer = HeadlineDrawer;
