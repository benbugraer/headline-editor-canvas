"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarButton = void 0;
var react_1 = __importDefault(require("react"));
var SidebarButton = function (_a) {
    var Icon = _a.icon, label = _a.label, onClick = _a.onClick;
    return (react_1.default.createElement("button", { className: "w-full flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded-lg transition-colors", onClick: onClick },
        react_1.default.createElement(Icon, { className: "h-5 w-5 text-primary" }),
        react_1.default.createElement("span", { className: "text-xs font-normal text-primary" }, label)));
};
exports.SidebarButton = SidebarButton;
