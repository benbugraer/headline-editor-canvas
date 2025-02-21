"use strict";
"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CanvasApp;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var constants_1 = require("./utils/constants");
var useCanvasInitialization_1 = require("./hooks/useCanvasInitialization");
var Settings_1 = __importDefault(require("./Settings/Settings"));
var Sidebar_1 = __importDefault(require("./Sidebar/Sidebar"));
var TopBar_1 = __importDefault(require("../TopBar/TopBar"));
function CanvasApp() {
    var canvasRef = (0, react_1.useRef)(null);
    var canvasWrapperRef = (0, react_1.useRef)(null);
    var _a = (0, react_1.useState)(null), canvas = _a[0], setCanvas = _a[1];
    var _b = (0, react_1.useState)([]), guidelines = _b[0], setGuidelines = _b[1];
    (0, useCanvasInitialization_1.useCanvasInitialization)(canvasRef, __assign({}, constants_1.CANVAS_DEFAULT_CONFIG), guidelines, setGuidelines, setCanvas);
    (0, react_1.useEffect)(function () {
        if (!canvas || !canvasWrapperRef.current)
            return;
        var handleClick = function (e) {
            var target = e.target;
            if (target === canvasWrapperRef.current) {
                canvas.discardActiveObject();
                canvas.requestRenderAll();
            }
        };
        canvasWrapperRef.current.addEventListener("mousedown", handleClick);
        return function () {
            var _a;
            (_a = canvasWrapperRef.current) === null || _a === void 0 ? void 0 : _a.removeEventListener("mousedown", handleClick);
        };
    }, [canvas]);
    (0, react_1.useEffect)(function () {
        if (!canvas)
            return;
        var handleLayerChange = function () {
            canvas.requestRenderAll();
        };
        document.addEventListener("layerChanged", handleLayerChange);
        return function () {
            document.removeEventListener("layerChanged", handleLayerChange);
        };
    }, [canvas]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen flex bg-tertiary", children: [(0, jsx_runtime_1.jsx)(Sidebar_1.default, { canvas: canvas }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-grow flex flex-col", children: [(0, jsx_runtime_1.jsx)(TopBar_1.default, { canvas: canvas }), (0, jsx_runtime_1.jsx)(Settings_1.default, { canvas: canvas }), (0, jsx_runtime_1.jsx)("div", { ref: canvasWrapperRef, className: "flex-grow flex justify-center items-center overflow-auto p-4 bg-gray-200", children: (0, jsx_runtime_1.jsx)("canvas", { ref: canvasRef, className: "border-2 border-primary" }) })] })] }));
}
//# sourceMappingURL=Canvas.js.map