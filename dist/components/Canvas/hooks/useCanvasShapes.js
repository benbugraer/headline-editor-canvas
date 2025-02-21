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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCanvasShapes = useCanvasShapes;
var fabric = __importStar(require("fabric"));
var react_1 = require("react");
var DEFAULT_OBJECT_CONFIG = {
    cornerColor: "#2196F3",
    cornerStrokeColor: "#2196F3",
    borderColor: "#2196F3",
    cornerSize: 8,
    transparentCorners: false,
    cornerStyle: "circle",
    padding: 8,
};
function useCanvasShapes(canvas) {
    var centerObject = (0, react_1.useCallback)(function (object) {
        if (!canvas)
            return;
        var canvasCenter = {
            x: canvas.width / 2,
            y: canvas.height / 2,
        };
        object.set(__assign({ left: canvasCenter.x - (object.width * (object.scaleX || 1)) / 2, top: canvasCenter.y - (object.height * (object.scaleY || 1)) / 2 }, DEFAULT_OBJECT_CONFIG));
    }, [canvas]);
    var handleAddRectangle = (0, react_1.useCallback)(function () {
        if (!canvas)
            return;
        try {
            var rect = new fabric.Rect(__assign({ width: 100, height: 60, fill: "#ff5757" }, DEFAULT_OBJECT_CONFIG));
            centerObject(rect);
            canvas.add(rect);
            canvas.setActiveObject(rect);
            canvas.renderAll();
        }
        catch (error) {
            console.error("Error adding rectangle:", error);
        }
    }, [canvas, centerObject]);
    var handleAddCircle = (0, react_1.useCallback)(function () {
        if (!canvas)
            return;
        try {
            var circle = new fabric.Circle(__assign({ radius: 50, fill: "#ff5757" }, DEFAULT_OBJECT_CONFIG));
            centerObject(circle);
            canvas.add(circle);
            canvas.setActiveObject(circle);
            canvas.renderAll();
        }
        catch (error) {
            console.error("Error adding circle:", error);
        }
    }, [canvas, centerObject]);
    var handleAddText = (0, react_1.useCallback)(function () {
        if (!canvas)
            return;
        try {
            var text_1 = new fabric.IText("Yeni Metin", __assign({ fontFamily: "Arial", fontSize: 20, fill: "#000000" }, DEFAULT_OBJECT_CONFIG));
            centerObject(text_1);
            // Right click to edit text
            text_1.on("mousedown", function (e) {
                if (e.e.button !== 2)
                    return;
                text_1.enterEditing();
                text_1.selectAll();
                canvas.renderAll();
            });
            canvas.add(text_1);
            canvas.setActiveObject(text_1);
            canvas.renderAll();
        }
        catch (error) {
            console.error("Error adding text:", error);
        }
    }, [canvas, centerObject]);
    var handleImageUpload = (0, react_1.useCallback)(function (file) {
        if (!canvas)
            return;
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            var img = new Image();
            img.onload = function () {
                try {
                    var fabricImage = new fabric.Image(img, __assign({}, DEFAULT_OBJECT_CONFIG));
                    // Scale image to fit canvas while maintaining aspect ratio
                    var scale = Math.min((canvas.width * 0.8) / img.width, (canvas.height * 0.8) / img.height, 1);
                    fabricImage.scale(scale);
                    centerObject(fabricImage);
                    canvas.add(fabricImage);
                    canvas.setActiveObject(fabricImage);
                    canvas.renderAll();
                }
                catch (error) {
                    console.error("Error creating fabric image:", error);
                }
            };
            img.onerror = function () {
                console.error("Error loading image");
            };
            img.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        };
        reader.onerror = function () {
            console.error("Error reading file");
        };
        reader.readAsDataURL(file);
    }, [canvas, centerObject]);
    var handleAddIcon = (0, react_1.useCallback)(function (iconPath, color) {
        if (!canvas)
            return;
        try {
            var path = new fabric.Path(iconPath, __assign({ fill: color, scaleX: 0.05, scaleY: 0.05 }, DEFAULT_OBJECT_CONFIG));
            centerObject(path);
            canvas.add(path);
            canvas.setActiveObject(path);
            canvas.renderAll();
        }
        catch (error) {
            console.error("Error adding icon:", error);
        }
    }, [canvas, centerObject]);
    return {
        handleAddRectangle: handleAddRectangle,
        handleAddCircle: handleAddCircle,
        handleAddText: handleAddText,
        handleImageUpload: handleImageUpload,
        handleAddIcon: handleAddIcon,
    };
}
