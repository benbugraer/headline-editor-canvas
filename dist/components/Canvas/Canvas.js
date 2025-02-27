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
var react_1 = require("react");
var constants_1 = require("./utils/constants");
var useCanvasInitialization_1 = require("./hooks/useCanvasInitialization");
var Settings_1 = __importDefault(require("./Settings/Settings"));
var Sidebar_1 = __importDefault(require("./Sidebar/Sidebar"));
var TopBar_1 = __importDefault(require("../TopBar/TopBar"));
var react_2 = __importDefault(require("react"));
var HeadlineEditorCanvas = function (_a) {
    var _b = _a.width, width = _b === void 0 ? 800 : _b, _c = _a.height, height = _c === void 0 ? 600 : _c, _d = _a.backgroundColor, backgroundColor = _d === void 0 ? "#ffffff" : _d;
    var canvasRef = (0, react_1.useRef)(null);
    var canvasWrapperRef = (0, react_1.useRef)(null);
    var _e = (0, react_1.useState)(null), canvas = _e[0], setCanvas = _e[1];
    var _f = (0, react_1.useState)([]), guidelines = _f[0], setGuidelines = _f[1];
    (0, useCanvasInitialization_1.useCanvasInitialization)(canvasRef, __assign(__assign({}, constants_1.CANVAS_DEFAULT_CONFIG), { width: width, height: height, backgroundColor: backgroundColor }), guidelines, setGuidelines, setCanvas);
    var handleWrapperClick = (0, react_1.useCallback)(function (e) {
        if (!canvas || !canvasWrapperRef.current)
            return;
        var target = e.target;
        if (target === canvasWrapperRef.current) {
            canvas.discardActiveObject();
            canvas.requestRenderAll();
        }
    }, [canvas]);
    (0, react_1.useEffect)(function () {
        var wrapper = canvasWrapperRef.current;
        if (!wrapper)
            return;
        wrapper.addEventListener("mousedown", handleWrapperClick);
        return function () {
            wrapper.removeEventListener("mousedown", handleWrapperClick);
        };
    }, [handleWrapperClick]);
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
    return (react_2.default.createElement("div", { className: "min-h-screen flex bg-tertiary" },
        react_2.default.createElement(Sidebar_1.default, { canvas: canvas }),
        react_2.default.createElement("div", { className: "flex-grow flex flex-col" },
            react_2.default.createElement(TopBar_1.default, { canvas: canvas }),
            react_2.default.createElement(Settings_1.default, { canvas: canvas }),
            react_2.default.createElement("div", { ref: canvasWrapperRef, className: "flex-grow flex justify-center items-center overflow-auto p-4 bg-gray-200" },
                react_2.default.createElement("canvas", { ref: canvasRef, className: "border-2 border-primary" })))));
};
exports.default = HeadlineEditorCanvas;
