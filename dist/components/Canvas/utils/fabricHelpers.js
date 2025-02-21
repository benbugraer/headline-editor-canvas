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
exports.createShadow = exports.getInitialStates = void 0;
var fabric = __importStar(require("fabric"));
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    if (!object)
        return defaultStates;
    var shadow = object.shadow;
    var isText = object.type === "i-text";
    var isShape = object.type === "rect" || object.type === "image";
    var isCircle = object.type === "circle";
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
            : isShape
                ? {
                    enabled: !!object.rx,
                    radius: (_j = object.rx) !== null && _j !== void 0 ? _j : defaultStates.shapeRadius.radius,
                }
                : {})),
        background: __assign(__assign({}, defaultStates.background), (isText
            ? {
                enabled: !!object.backgroundColor,
                color: (_k = object.backgroundColor) !== null && _k !== void 0 ? _k : defaultStates.background.color,
                padding: (_l = object.padding) !== null && _l !== void 0 ? _l : defaultStates.background.padding,
            }
            : {
                enabled: !!object.backgroundColor,
                color: (_m = object.backgroundColor) !== null && _m !== void 0 ? _m : defaultStates.background.color,
                padding: (_o = object.padding) !== null && _o !== void 0 ? _o : defaultStates.background.padding,
            })),
    };
};
exports.getInitialStates = getInitialStates;
var createShadow = function (shadowState) {
    return new fabric.Shadow({
        color: shadowState.color,
        blur: shadowState.blur,
        offsetX: shadowState.offsetX,
        offsetY: shadowState.offsetY,
    });
};
exports.createShadow = createShadow;
//# sourceMappingURL=fabricHelpers.js.map