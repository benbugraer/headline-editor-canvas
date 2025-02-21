"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCanvasInitialization = void 0;
var react_1 = require("react");
var fabric_1 = require("fabric");
var snapping_1 = require("../utils/snapping");
var useCanvasInitialization = function (canvasRef, config, guidelines, setGuidelines, setCanvas) {
    (0, react_1.useEffect)(function () {
        if (!canvasRef.current)
            return;
        // Canvas initialization
        var initCanvas = new fabric_1.Canvas(canvasRef.current, __assign(__assign({}, config), { selection: true, preserveObjectStacking: true }));
        // Initial render
        initCanvas.renderAll();
        setCanvas(initCanvas);
        // Event handler functions
        var objectMovingHandler = function (event) {
            if (event.target) {
                (0, snapping_1.handleObjectMoving)(initCanvas, event.target, guidelines, setGuidelines);
            }
        };
        var objectModifiedHandler = function () {
            (0, snapping_1.clearGuidelines)(initCanvas, guidelines, setGuidelines);
        };
        var handlePaste = function (event) {
            var _a;
            event.preventDefault();
            var clipboardItems = (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.items;
            if (!clipboardItems)
                return;
            var _loop_1 = function (i) {
                var item = clipboardItems[i];
                if (item.type.indexOf("image") !== -1) {
                    var blob = item.getAsFile();
                    if (!blob)
                        return "continue";
                    var blobUrl_1 = URL.createObjectURL(blob);
                    var img_1 = new Image();
                    img_1.onload = function () {
                        var scale = Math.min((initCanvas.width * 0.8) / img_1.width, (initCanvas.height * 0.8) / img_1.height, 1);
                        fabric_1.Image.fromURL(blobUrl_1).then(function (fabricImage) {
                            fabricImage.set({
                                left: (initCanvas.width - img_1.width * scale) / 2,
                                top: (initCanvas.height - img_1.height * scale) / 2,
                                scaleX: scale,
                                scaleY: scale,
                            });
                            fabricImage.setControlsVisibility({
                                mt: true,
                                mb: true,
                                ml: true,
                                mr: true,
                                bl: true,
                                br: true,
                                tl: true,
                                tr: true,
                                mtr: true,
                            });
                            initCanvas.add(fabricImage);
                            initCanvas.setActiveObject(fabricImage);
                            fabricImage.setCoords();
                            initCanvas.requestRenderAll();
                            URL.revokeObjectURL(blobUrl_1);
                        });
                    };
                    img_1.onerror = function () {
                        console.error("Error loading image");
                        URL.revokeObjectURL(blobUrl_1);
                    };
                    img_1.src = blobUrl_1;
                    return "break";
                }
            };
            for (var i = 0; i < clipboardItems.length; i++) {
                var state_1 = _loop_1(i);
                if (state_1 === "break")
                    break;
            }
        };
        // Add event listeners
        initCanvas.on("object:moving", objectMovingHandler);
        initCanvas.on("object:modified", objectModifiedHandler);
        window.addEventListener("paste", handlePaste);
        // Cleanup function
        return function () {
            // Remove event listeners
            initCanvas.off("object:moving", objectMovingHandler);
            initCanvas.off("object:modified", objectModifiedHandler);
            window.removeEventListener("paste", handlePaste);
            // Clear all objects and dispose canvas
            initCanvas.getObjects().forEach(function (obj) { return initCanvas.remove(obj); });
            initCanvas.dispose();
            // Clear canvas reference
            setCanvas(null);
        };
    }, []); // Empty dependency array since we only want to initialize once
};
exports.useCanvasInitialization = useCanvasInitialization;
