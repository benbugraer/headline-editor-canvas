"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCanvasInitialization = void 0;
var react_1 = require("react");
var fabric_1 = require("fabric"); // Image'i de import ediyoruz
var snapping_1 = require("../utils/snapping");
var useCanvasInitialization = function (canvasRef, config, guidelines, setGuidelines, setCanvas) {
    (0, react_1.useEffect)(function () {
        if (!canvasRef.current)
            return;
        var initCanvas = new fabric_1.Canvas(canvasRef.current, config);
        initCanvas.renderAll();
        setCanvas(initCanvas);
        // Event listeners
        initCanvas.on("object:moving", function (event) {
            return (0, snapping_1.handleObjectMoving)(initCanvas, event.target, guidelines, setGuidelines);
        });
        initCanvas.on("object:modified", function () {
            (0, snapping_1.clearGuidelines)(initCanvas, guidelines, setGuidelines);
        });
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
                    var img_1 = new Image();
                    var blobUrl_1 = URL.createObjectURL(blob);
                    img_1.onload = function () {
                        var scale = Math.min((initCanvas.width * 0.8) / img_1.width, (initCanvas.height * 0.8) / img_1.height, 1);
                        var scaledWidth = img_1.width * scale;
                        var scaledHeight = img_1.height * scale;
                        var fabricImage = new fabric_1.Image(img_1, {
                            left: (initCanvas.width - scaledWidth) / 2,
                            top: (initCanvas.height - scaledHeight) / 2,
                            originX: "left",
                            originY: "top",
                            scaleX: scale,
                            scaleY: scale,
                            hasControls: true,
                            hasBorders: true,
                            selectable: true,
                            cornerStyle: "circle",
                            transparentCorners: false,
                            cornerSize: 12,
                            padding: 0,
                            strokeWidth: 0,
                            strokeUniform: true,
                            centeredRotation: true,
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
        window.addEventListener("paste", handlePaste);
        return function () {
            initCanvas.dispose();
            window.removeEventListener("paste", handlePaste);
        };
    }, []);
};
exports.useCanvasInitialization = useCanvasInitialization;
//# sourceMappingURL=useCanvasInitialization.js.map