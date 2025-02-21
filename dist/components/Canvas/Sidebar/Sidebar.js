"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Sidebar;
var react_1 = __importDefault(require("react"));
var canvas_types_1 = require("../types/canvas.types");
var useCanvasShapes_1 = require("../hooks/useCanvasShapes");
var useSidebarState_1 = require("../hooks/useSidebarState");
var IconDrawer_1 = require("./IconDrawer");
var HeadlineDrawer_1 = require("./HeadlineDrawer");
var SidebarButton_1 = require("./SidebarButton");
function Sidebar(_a) {
    var canvas = _a.canvas;
    var _b = (0, useSidebarState_1.useSidebarState)(), isIconDrawerOpen = _b.isIconDrawerOpen, setIsIconDrawerOpen = _b.setIsIconDrawerOpen, isHeadlineDrawerOpen = _b.isHeadlineDrawerOpen, setIsHeadlineDrawerOpen = _b.setIsHeadlineDrawerOpen;
    var fileInputRef = react_1.default.useRef(null);
    var _c = (0, useCanvasShapes_1.useCanvasShapes)(canvas), handleAddRectangle = _c.handleAddRectangle, handleAddCircle = _c.handleAddCircle, handleAddText = _c.handleAddText, handleImageUpload = _c.handleImageUpload, handleAddIcon = _c.handleAddIcon;
    var handleFileChange = function (event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file)
            handleImageUpload(file);
    };
    var itemHandlers = {
        Dikdörtgen: handleAddRectangle,
        Daire: handleAddCircle,
        Metin: handleAddText,
        "Görsel Ekle": function () { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); },
    };
    var renderSidebarItem = function (item) {
        switch (item.label) {
            case "İkon Ekle":
                return (react_1.default.createElement(IconDrawer_1.IconDrawer, { isOpen: isIconDrawerOpen, onOpenChange: setIsIconDrawerOpen, onIconSelect: function (icon) { return handleAddIcon(icon, "defaultColor"); }, item: item }));
            case "Manşet Seç":
                return (react_1.default.createElement(HeadlineDrawer_1.HeadlineDrawer, { isOpen: isHeadlineDrawerOpen, onOpenChange: setIsHeadlineDrawerOpen, canvas: canvas, item: item }));
            default:
                return (react_1.default.createElement(SidebarButton_1.SidebarButton, { icon: item.icon, label: item.label, onClick: itemHandlers[item.label] }));
        }
    };
    return (react_1.default.createElement("div", { className: "w-28 flex flex-col border-r bg-gray-50 shadow-lg" },
        react_1.default.createElement("div", { className: "flex-1 overflow-y-auto p-4" },
            react_1.default.createElement("input", { type: "file", ref: fileInputRef, className: "hidden", onChange: handleFileChange, accept: "image/*" }),
            react_1.default.createElement("nav", { className: "space-y-2" }, canvas_types_1.SIDEBAR_ITEMS.map(function (item) { return (react_1.default.createElement("div", { key: item.label }, renderSidebarItem(item))); })))));
}
