"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TopBar;
var jsx_runtime_1 = require("react/jsx-runtime");
var DownloadButton_1 = __importDefault(require("./DownloadButton"));
var input_1 = require("../ui/input");
var react_1 = require("react");
function TopBar(_a) {
    var canvas = _a.canvas;
    var _b = (0, react_1.useState)(""), fileName = _b[0], setFileName = _b[1];
    return ((0, jsx_runtime_1.jsx)("header", { className: "flex flex-col bg-secondary", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex h-10 lg:h-14 items-center gap-4 border-b border-primary", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-start ml-5", children: (0, jsx_runtime_1.jsx)(input_1.Input, { className: "border-primary rounded-sm", placeholder: "G\u00F6rsel Ad\u0131", value: fileName, onChange: function (e) { return setFileName(e.target.value); } }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center gap-2 ml-auto mr-6", children: (0, jsx_runtime_1.jsx)(DownloadButton_1.default, { canvas: canvas, fileName: fileName }) })] }) }));
}
//# sourceMappingURL=TopBar.js.map