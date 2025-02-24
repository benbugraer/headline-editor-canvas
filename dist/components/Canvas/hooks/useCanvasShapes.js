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
exports.useCanvasShapes = useCanvasShapes;
/* eslint-disable @typescript-eslint/no-unused-vars */
var fabric_1 = require("fabric");
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
        if (!canvas || typeof window === "undefined")
            return;
        try {
            var rect = new fabric_1.fabric.Rect(__assign({ width: 100, height: 60, fill: "#ff5757" }, DEFAULT_OBJECT_CONFIG));
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
        if (!canvas || typeof window === "undefined")
            return;
        try {
            var circle = new fabric_1.fabric.Circle(__assign({ radius: 50, fill: "#ff5757" }, DEFAULT_OBJECT_CONFIG));
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
        if (!canvas || typeof window === "undefined")
            return;
        try {
            var text_1 = new fabric_1.fabric.IText("Yeni Metin", __assign({ fontFamily: "Arial", fontSize: 20, fill: "#000000" }, DEFAULT_OBJECT_CONFIG));
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
        if (!canvas || typeof window === "undefined")
            return;
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            var img = new Image();
            img.onload = function () {
                var _a;
                try {
                    fabric_1.fabric.Image.fromURL((_a = e.target) === null || _a === void 0 ? void 0 : _a.result, function (fabricImage) {
                        if (!fabricImage)
                            return;
                        // Scale image to fit canvas while maintaining aspect ratio
                        var scale = Math.min((canvas.width * 0.8) / fabricImage.width, (canvas.height * 0.8) / fabricImage.height, 1);
                        fabricImage.scale(scale);
                        fabricImage.set(DEFAULT_OBJECT_CONFIG);
                        centerObject(fabricImage);
                        canvas.add(fabricImage);
                        canvas.setActiveObject(fabricImage);
                        canvas.renderAll();
                    });
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
        if (!canvas || typeof window === "undefined")
            return;
        try {
            fabric_1.fabric.loadSVGFromString(iconPath, function (objects, options) {
                var path = fabric_1.fabric.util.groupSVGElements(objects, options);
                path.set(__assign({ fill: color, scaleX: 0.05, scaleY: 0.05 }, DEFAULT_OBJECT_CONFIG));
                centerObject(path);
                canvas.add(path);
                canvas.setActiveObject(path);
                canvas.renderAll();
            });
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
