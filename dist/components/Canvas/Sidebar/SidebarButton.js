"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarButton = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var SidebarButton = function (_a) {
    var Icon = _a.icon, label = _a.label, onClick = _a.onClick;
    return ((0, jsx_runtime_1.jsxs)("button", { className: "w-full flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded-lg transition-colors", onClick: onClick, children: [(0, jsx_runtime_1.jsx)(Icon, { className: "h-5 w-5 text-primary" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-normal text-primary", children: label })] }));
};
exports.SidebarButton = SidebarButton;
//# sourceMappingURL=SidebarButton.js.map