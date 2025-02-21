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
exports.useCanvasObject = void 0;
var react_1 = require("react");
var fabric = __importStar(require("fabric"));
var fabricHelpers_1 = require("../utils/fabricHelpers");
var lodash_1 = require("lodash");
var useCanvasObject = function (selectedObject, canvas, onObjectUpdate) {
    // Initialize states with memoized initial values
    var initialStates = (0, react_1.useMemo)(function () { return (0, fabricHelpers_1.getInitialStates)(selectedObject); }, [selectedObject]);
    var _a = (0, react_1.useState)(initialStates.opacity), opacity = _a[0], setOpacity = _a[1];
    var _b = (0, react_1.useState)(initialStates.shadow), shadow = _b[0], setShadow = _b[1];
    var _c = (0, react_1.useState)(initialStates.textStroke), textStroke = _c[0], setTextStroke = _c[1];
    var _d = (0, react_1.useState)(initialStates.shapeRadius), shapeRadius = _d[0], setShapeRadius = _d[1];
    var _e = (0, react_1.useState)(initialStates.background), background = _e[0], setBackground = _e[1];
    // Debounced render function for performance
    var debouncedRender = (0, react_1.useMemo)(function () {
        return (0, lodash_1.debounce)(function () {
            if (canvas) {
                canvas.requestRenderAll();
                onObjectUpdate === null || onObjectUpdate === void 0 ? void 0 : onObjectUpdate();
            }
        }, 16);
    }, // ~60fps
    [canvas, onObjectUpdate]);
    // Cleanup debounced function
    (0, react_1.useEffect)(function () {
        return function () {
            debouncedRender.cancel();
        };
    }, [debouncedRender]);
    // Opacity handlers with error handling
    var handleOpacityChange = (0, react_1.useCallback)(function (value) {
        if (!selectedObject || !canvas || !opacity.enabled)
            return;
        try {
            var normalizedValue_1 = Math.max(0, Math.min(100, value));
            selectedObject.set("opacity", normalizedValue_1 / 100);
            setOpacity(function (prev) { return (__assign(__assign({}, prev), { value: normalizedValue_1 })); });
            debouncedRender();
        }
        catch (error) {
            console.error("Error changing opacity:", error);
        }
    }, [selectedObject, canvas, opacity.enabled, debouncedRender]);
    var handleOpacityToggle = (0, react_1.useCallback)(function (enabled) {
        if (!selectedObject || !canvas)
            return;
        try {
            setOpacity(function (prev) {
                var newOpacity = __assign(__assign({}, prev), { enabled: enabled });
                selectedObject.set("opacity", newOpacity.enabled ? newOpacity.value / 100 : 1);
                debouncedRender();
                return newOpacity;
            });
        }
        catch (error) {
            console.error("Error toggling opacity:", error);
        }
    }, [selectedObject, canvas, debouncedRender]);
    // Shadow handlers with validation
    var handleShadowChange = (0, react_1.useCallback)(function (updates) {
        if (!selectedObject || !canvas)
            return;
        try {
            setShadow(function (prev) {
                var currentShadow = selectedObject.shadow;
                var newShadow = __assign(__assign(__assign({}, prev), { color: (currentShadow === null || currentShadow === void 0 ? void 0 : currentShadow.color) || "#000000", blur: (currentShadow === null || currentShadow === void 0 ? void 0 : currentShadow.blur) || 0, offsetX: (currentShadow === null || currentShadow === void 0 ? void 0 : currentShadow.offsetX) || 0, offsetY: (currentShadow === null || currentShadow === void 0 ? void 0 : currentShadow.offsetY) || 0 }), updates);
                // Validate shadow values
                newShadow.blur = Math.max(0, newShadow.blur);
                newShadow.offsetX = Math.min(100, Math.max(-100, newShadow.offsetX));
                newShadow.offsetY = Math.min(100, Math.max(-100, newShadow.offsetY));
                selectedObject.set("shadow", newShadow.enabled ? (0, fabricHelpers_1.createShadow)(newShadow) : null);
                debouncedRender();
                return newShadow;
            });
        }
        catch (error) {
            console.error("Error changing shadow:", error);
        }
    }, [selectedObject, canvas, debouncedRender]);
    // Text stroke handlers with validation
    var handleTextStrokeChange = (0, react_1.useCallback)(function (updates) {
        if (!selectedObject || !canvas || selectedObject.type !== "i-text")
            return;
        try {
            setTextStroke(function (prev) {
                var newStroke = __assign(__assign({}, prev), updates);
                var textObject = selectedObject;
                if (!newStroke.enabled) {
                    textObject.set({
                        stroke: undefined,
                        strokeWidth: 0,
                        strokeUniform: false,
                        paintFirst: "fill",
                    });
                }
                else {
                    // Validate stroke width
                    newStroke.width = Math.max(0, Math.min(20, newStroke.width));
                    textObject.set({
                        stroke: newStroke.color,
                        strokeWidth: newStroke.width * 2,
                        strokeUniform: true,
                        paintFirst: "stroke",
                        strokeLineJoin: "round",
                        strokeLineCap: "round",
                    });
                    if (newStroke.width > 2) {
                        var currentShadow = textObject.shadow;
                        if (!currentShadow) {
                            textObject.set({
                                shadow: new fabric.Shadow({
                                    color: newStroke.color,
                                    blur: newStroke.width / 2,
                                    offsetX: 0,
                                    offsetY: 0,
                                }),
                            });
                        }
                    }
                }
                debouncedRender();
                return newStroke;
            });
        }
        catch (error) {
            console.error("Error changing text stroke:", error);
        }
    }, [selectedObject, canvas, debouncedRender]);
    // Shape radius handlers with validation
    var handleCornerRadiusChange = (0, react_1.useCallback)(function (updates) {
        if (!selectedObject || !canvas)
            return;
        try {
            setShapeRadius(function (prev) {
                var newCornerRadius = __assign(__assign({}, prev), updates);
                if (selectedObject.type === "rect" ||
                    selectedObject.type === "image") {
                    var fabricObject = selectedObject;
                    var width = fabricObject.width || 0;
                    var height = fabricObject.height || 0;
                    var scaleX = fabricObject.scaleX || 1;
                    var scaleY = fabricObject.scaleY || 1;
                    var realWidth = width * Math.abs(scaleX);
                    var realHeight = height * Math.abs(scaleY);
                    // Normalize and validate radius
                    var normalizedRadius = Math.max(0, Math.min(140, newCornerRadius.radius)) / 140;
                    var maxRadius = Math.min(realWidth, realHeight) / 2;
                    var effectiveRadius = maxRadius * normalizedRadius;
                    var rx = newCornerRadius.enabled
                        ? effectiveRadius / Math.abs(scaleX)
                        : 0;
                    var ry = newCornerRadius.enabled
                        ? effectiveRadius / Math.abs(scaleY)
                        : 0;
                    fabricObject.set({ rx: rx, ry: ry });
                    fabricObject.setCoords();
                }
                debouncedRender();
                return newCornerRadius;
            });
        }
        catch (error) {
            console.error("Error changing corner radius:", error);
        }
    }, [selectedObject, canvas, debouncedRender]);
    // Background handlers with validation
    var handleBackgroundChange = (0, react_1.useCallback)(function (updates) {
        if (!selectedObject || !canvas)
            return;
        try {
            setBackground(function (prev) {
                var newBackground = __assign(__assign({}, prev), updates);
                // Validate padding
                newBackground.padding = Math.max(0, Math.min(50, newBackground.padding));
                if (selectedObject.type === "i-text") {
                    var textObject = selectedObject;
                    textObject.set({
                        textBackgroundColor: newBackground.enabled
                            ? newBackground.color
                            : undefined,
                        padding: newBackground.enabled ? newBackground.padding : 0,
                    });
                }
                else {
                    selectedObject.set({
                        backgroundColor: newBackground.enabled
                            ? newBackground.color
                            : undefined,
                        padding: newBackground.enabled ? newBackground.padding : 0,
                    });
                }
                debouncedRender();
                return newBackground;
            });
        }
        catch (error) {
            console.error("Error changing background:", error);
        }
    }, [selectedObject, canvas, debouncedRender]);
    // Reset effects when selected object changes
    (0, react_1.useEffect)(function () {
        if (selectedObject) {
            setOpacity(initialStates.opacity);
            setShadow(initialStates.shadow);
            setTextStroke(initialStates.textStroke);
            setShapeRadius(initialStates.shapeRadius);
            setBackground(initialStates.background);
        }
    }, [selectedObject, initialStates]);
    return {
        opacity: opacity,
        shadow: shadow,
        textStroke: textStroke,
        shapeRadius: shapeRadius,
        background: background,
        handlers: {
            handleOpacityChange: handleOpacityChange,
            handleOpacityToggle: handleOpacityToggle,
            handleShadowChange: handleShadowChange,
            handleTextStrokeChange: handleTextStrokeChange,
            handleCornerRadiusChange: handleCornerRadiusChange,
            handleBackgroundChange: handleBackgroundChange,
        },
    };
};
exports.useCanvasObject = useCanvasObject;
