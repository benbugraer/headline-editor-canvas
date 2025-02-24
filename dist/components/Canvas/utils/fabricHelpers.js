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
exports.createShadow = exports.getInitialStates = void 0;
var fabric_1 = require("fabric");
var defaultStates = {
    opacity: {
        enabled: false,
        value: 100,
    },
    shadow: {
        enabled: false,
        blur: 15,
        offsetX: 10,
        offsetY: 10,
        color: "#000000",
    },
    textStroke: {
        enabled: false,
        width: 1,
        color: "#000000",
    },
    shapeRadius: {
        enabled: false,
        radius: 10,
    },
    background: {
        enabled: false,
        color: "#ffffff",
        padding: 10,
    },
};
var getInitialStates = function (object) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    if (!object || typeof window === "undefined")
        return defaultStates;
    try {
        var shadow = object.shadow;
        var isText = object instanceof fabric_1.fabric.IText;
        var isShape = object instanceof fabric_1.fabric.Rect || object instanceof fabric_1.fabric.Image;
        var isCircle = object instanceof fabric_1.fabric.Circle;
        return {
            opacity: {
                enabled: object.opacity !== undefined && object.opacity !== 1,
                value: Math.round(((_a = object.opacity) !== null && _a !== void 0 ? _a : 1) * 100),
            },
            shadow: {
                enabled: !!shadow,
                blur: (_b = shadow === null || shadow === void 0 ? void 0 : shadow.blur) !== null && _b !== void 0 ? _b : defaultStates.shadow.blur,
                offsetX: (_c = shadow === null || shadow === void 0 ? void 0 : shadow.offsetX) !== null && _c !== void 0 ? _c : defaultStates.shadow.offsetX,
                offsetY: (_d = shadow === null || shadow === void 0 ? void 0 : shadow.offsetY) !== null && _d !== void 0 ? _d : defaultStates.shadow.offsetY,
                color: (_e = shadow === null || shadow === void 0 ? void 0 : shadow.color) !== null && _e !== void 0 ? _e : defaultStates.shadow.color,
            },
            textStroke: {
                enabled: !!(object.stroke && object.strokeWidth),
                width: (_f = object.strokeWidth) !== null && _f !== void 0 ? _f : defaultStates.textStroke.width,
                color: (_g = object.stroke) !== null && _g !== void 0 ? _g : defaultStates.textStroke.color,
            },
            shapeRadius: __assign(__assign({}, defaultStates.shapeRadius), (isCircle
                ? {
                    enabled: true,
                    radius: (_h = object.radius) !== null && _h !== void 0 ? _h : defaultStates.shapeRadius.radius,
                }
                : isShape && object instanceof fabric_1.fabric.Rect
                    ? {
                        enabled: !!object.rx,
                        radius: (_j = object.rx) !== null && _j !== void 0 ? _j : defaultStates.shapeRadius.radius,
                    }
                    : {})),
            background: __assign(__assign({}, defaultStates.background), { enabled: !!object.backgroundColor, color: (_k = object.backgroundColor) !== null && _k !== void 0 ? _k : defaultStates.background.color, padding: (_l = object.padding) !== null && _l !== void 0 ? _l : defaultStates.background.padding }),
        };
    }
    catch (error) {
        console.error("Error getting initial states:", error);
        return defaultStates;
    }
};
exports.getInitialStates = getInitialStates;
var createShadow = function (shadowState) {
    if (typeof window === "undefined")
        return null;
    try {
        return new fabric_1.fabric.Shadow({
            color: shadowState.color,
            blur: shadowState.blur,
            offsetX: shadowState.offsetX,
            offsetY: shadowState.offsetY,
        });
    }
    catch (error) {
        console.error("Error creating shadow:", error);
        return null;
    }
};
exports.createShadow = createShadow;
