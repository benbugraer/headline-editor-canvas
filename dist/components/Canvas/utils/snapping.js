"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.setupCanvasEvents = exports.handleObjectMoving = exports.clearGuidelines = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
var fabric_1 = require("fabric");
var constants_1 = require("./constants");
// Guideline ID'leri için enum
var GuidelineId;
(function (GuidelineId) {
    GuidelineId["VerticalLeft"] = "guideline-vertical-left";
    GuidelineId["VerticalRight"] = "guideline-vertical-right";
    GuidelineId["VerticalCenter"] = "guideline-vertical-center";
    GuidelineId["HorizontalTop"] = "guideline-horizontal-top";
    GuidelineId["HorizontalBottom"] = "guideline-horizontal-bottom";
    GuidelineId["HorizontalCenter"] = "guideline-horizontal-center";
    GuidelineId["ObjectVerticalCenter"] = "guideline-object-vertical-center";
    GuidelineId["ObjectHorizontalCenter"] = "guideline-object-horizontal-center";
    GuidelineId["ObjectLeft"] = "guideline-object-left";
    GuidelineId["ObjectRight"] = "guideline-object-right";
    GuidelineId["ObjectTop"] = "guideline-object-top";
    GuidelineId["ObjectBottom"] = "guideline-object-bottom";
})(GuidelineId || (GuidelineId = {}));
var CustomFabricLine = /** @class */ (function (_super) {
    __extends(CustomFabricLine, _super);
    function CustomFabricLine(points, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, points, options) || this;
        _this.data = options.data;
        return _this;
    }
    return CustomFabricLine;
}(fabric_1.fabric.Line));
var calculateObjectBounds = function (obj) {
    var _a, _b, _c, _d, _e, _f, _g;
    var left = (_a = obj.left) !== null && _a !== void 0 ? _a : 0;
    var top = (_b = obj.top) !== null && _b !== void 0 ? _b : 0;
    var scaleX = (_c = obj.scaleX) !== null && _c !== void 0 ? _c : 1;
    var scaleY = (_d = obj.scaleY) !== null && _d !== void 0 ? _d : 1;
    var width = ((_e = obj.width) !== null && _e !== void 0 ? _e : 0) * Math.abs(scaleX);
    var height = ((_f = obj.height) !== null && _f !== void 0 ? _f : 0) * Math.abs(scaleY);
    var angle = (_g = obj.angle) !== null && _g !== void 0 ? _g : 0;
    // Handle rotation
    if (angle === 0) {
        return {
            left: left,
            top: top,
            right: left + width,
            bottom: top + height,
            centerX: left + width / 2,
            centerY: top + height / 2,
            width: width,
            height: height,
        };
    }
    // Calculate rotated bounds
    var rad = (angle * Math.PI) / 180;
    var sin = Math.sin(rad);
    var cos = Math.cos(rad);
    var points = [
        { x: left, y: top },
        { x: left + width, y: top },
        { x: left + width, y: top + height },
        { x: left, y: top + height },
    ];
    var rotatedPoints = points.map(function (p) {
        var centerX = left + width / 2;
        var centerY = top + height / 2;
        var dx = p.x - centerX;
        var dy = p.y - centerY;
        return {
            x: centerX + dx * cos - dy * sin,
            y: centerY + dx * sin + dy * cos,
        };
    });
    var xs = rotatedPoints.map(function (p) { return p.x; });
    var ys = rotatedPoints.map(function (p) { return p.y; });
    return {
        left: Math.min.apply(Math, xs),
        right: Math.max.apply(Math, xs),
        top: Math.min.apply(Math, ys),
        bottom: Math.max.apply(Math, ys),
        centerX: left + width / 2,
        centerY: top + height / 2,
        width: width,
        height: height,
    };
};
var createGuideline = function (points, guidelineId, canvas) {
    return new CustomFabricLine(points, __assign(__assign({}, constants_1.GUIDELINE_STYLES), { data: { id: guidelineId } }));
};
var guidelineExists = function (canvas, guidelineId) {
    return canvas
        .getObjects()
        .some(function (obj) { var _a; return obj instanceof CustomFabricLine && ((_a = obj.data) === null || _a === void 0 ? void 0 : _a.id) === guidelineId; });
};
var clearGuidelines = function (canvas, guidelines, setGuidelines) {
    var guidelineObjects = canvas
        .getObjects()
        .filter(function (obj) {
        return (obj instanceof CustomFabricLine &&
            obj.data !== undefined &&
            Object.values(GuidelineId).includes(obj.data.id));
    });
    guidelineObjects.forEach(function (obj) { return canvas.remove(obj); });
    setGuidelines([]);
    canvas.requestRenderAll();
};
exports.clearGuidelines = clearGuidelines;
var checkAlignment = function (value1, value2, threshold) {
    return Math.abs(value1 - value2) < threshold;
};
var createAlignmentGuideline = function (canvas, position, isHorizontal, guidelineId, newGuidelines) {
    var _a, _b;
    if (!guidelineExists(canvas, guidelineId)) {
        var canvasWidth = (_a = canvas.width) !== null && _a !== void 0 ? _a : 0;
        var canvasHeight = (_b = canvas.height) !== null && _b !== void 0 ? _b : 0;
        var points = isHorizontal
            ? [0, position, canvasWidth, position]
            : [position, 0, position, canvasHeight];
        var line = createGuideline(points, guidelineId, canvas);
        newGuidelines.push({
            id: guidelineId,
            line: line,
            length: isHorizontal ? canvasWidth : canvasHeight,
            position: position,
            orientation: isHorizontal ? "horizontal" : "vertical",
            isHorizontal: isHorizontal,
        });
        canvas.add(line);
    }
};
var handleObjectMoving = function (canvas, movingObject, guidelines, setGuidelines) {
    var _a, _b;
    if (!canvas || !movingObject)
        return;
    var canvasWidth = (_a = canvas.width) !== null && _a !== void 0 ? _a : 0;
    var canvasHeight = (_b = canvas.height) !== null && _b !== void 0 ? _b : 0;
    var movingBounds = calculateObjectBounds(movingObject);
    var newGuidelines = [];
    var hasSnapped = false;
    // Canvas edge snapping
    var snapToCanvasEdges = function () {
        var snappingDistance = constants_1.SNAPPING_CONFIG.snappingDistance;
        var snapPoints = [
            {
                condition: checkAlignment(movingBounds.left, 0, snappingDistance),
                snap: { left: 0 },
                createGuideline: function () {
                    return createAlignmentGuideline(canvas, 0, false, GuidelineId.VerticalLeft, newGuidelines);
                },
            },
            {
                condition: checkAlignment(movingBounds.right, canvasWidth, snappingDistance),
                snap: { left: canvasWidth - movingBounds.width },
                createGuideline: function () {
                    return createAlignmentGuideline(canvas, canvasWidth, false, GuidelineId.VerticalRight, newGuidelines);
                },
            },
            {
                condition: checkAlignment(movingBounds.top, 0, snappingDistance),
                snap: { top: 0 },
                createGuideline: function () {
                    return createAlignmentGuideline(canvas, 0, true, GuidelineId.HorizontalTop, newGuidelines);
                },
            },
            {
                condition: checkAlignment(movingBounds.bottom, canvasHeight, snappingDistance),
                snap: { top: canvasHeight - movingBounds.height },
                createGuideline: function () {
                    return createAlignmentGuideline(canvas, canvasHeight, true, GuidelineId.HorizontalBottom, newGuidelines);
                },
            },
            {
                condition: checkAlignment(movingBounds.centerX, canvasWidth / 2, snappingDistance),
                snap: { left: canvasWidth / 2 - movingBounds.width / 2 },
                createGuideline: function () {
                    return createAlignmentGuideline(canvas, canvasWidth / 2, false, GuidelineId.VerticalCenter, newGuidelines);
                },
            },
            {
                condition: checkAlignment(movingBounds.centerY, canvasHeight / 2, snappingDistance),
                snap: { top: canvasHeight / 2 - movingBounds.height / 2 },
                createGuideline: function () {
                    return createAlignmentGuideline(canvas, canvasHeight / 2, true, GuidelineId.HorizontalCenter, newGuidelines);
                },
            },
        ];
        snapPoints.forEach(function (point) {
            if (point.condition) {
                movingObject.set(point.snap);
                point.createGuideline();
                hasSnapped = true;
            }
        });
    };
    // Object-to-object snapping
    var snapToObjects = function () {
        if (hasSnapped)
            return;
        var otherObjects = canvas
            .getObjects()
            .filter(function (obj) {
            return obj !== movingObject && !(obj instanceof CustomFabricLine);
        });
        for (var _i = 0, otherObjects_1 = otherObjects; _i < otherObjects_1.length; _i++) {
            var targetObject = otherObjects_1[_i];
            if (hasSnapped)
                break;
            var targetBounds = calculateObjectBounds(targetObject);
            var snappingDistance = constants_1.SNAPPING_CONFIG.snappingDistance;
            // Vertical alignment
            if (checkAlignment(movingBounds.centerX, targetBounds.centerX, snappingDistance)) {
                movingObject.set({
                    left: targetBounds.centerX - movingBounds.width / 2,
                });
                createAlignmentGuideline(canvas, targetBounds.centerX, false, GuidelineId.ObjectVerticalCenter, newGuidelines);
                hasSnapped = true;
            }
            else if (checkAlignment(movingBounds.left, targetBounds.left, snappingDistance)) {
                movingObject.set({ left: targetBounds.left });
                createAlignmentGuideline(canvas, targetBounds.left, false, GuidelineId.ObjectLeft, newGuidelines);
                hasSnapped = true;
            }
            else if (checkAlignment(movingBounds.right, targetBounds.right, snappingDistance)) {
                movingObject.set({ left: targetBounds.right - movingBounds.width });
                createAlignmentGuideline(canvas, targetBounds.right, false, GuidelineId.ObjectRight, newGuidelines);
                hasSnapped = true;
            }
            // Horizontal alignment
            if (checkAlignment(movingBounds.centerY, targetBounds.centerY, snappingDistance)) {
                movingObject.set({
                    top: targetBounds.centerY - movingBounds.height / 2,
                });
                createAlignmentGuideline(canvas, targetBounds.centerY, true, GuidelineId.ObjectHorizontalCenter, newGuidelines);
                hasSnapped = true;
            }
            else if (checkAlignment(movingBounds.top, targetBounds.top, snappingDistance)) {
                movingObject.set({ top: targetBounds.top });
                createAlignmentGuideline(canvas, targetBounds.top, true, GuidelineId.ObjectTop, newGuidelines);
                hasSnapped = true;
            }
            else if (checkAlignment(movingBounds.bottom, targetBounds.bottom, snappingDistance)) {
                movingObject.set({ top: targetBounds.bottom - movingBounds.height });
                createAlignmentGuideline(canvas, targetBounds.bottom, true, GuidelineId.ObjectBottom, newGuidelines);
                hasSnapped = true;
            }
        }
    };
    // Perform snapping
    snapToCanvasEdges();
    snapToObjects();
    // Update guidelines
    if (!hasSnapped) {
        (0, exports.clearGuidelines)(canvas, guidelines, setGuidelines);
    }
    else {
        setGuidelines(newGuidelines);
    }
    canvas.requestRenderAll();
};
exports.handleObjectMoving = handleObjectMoving;
// Canvas event'lerini ayarlamak için helper fonksiyon
var setupCanvasEvents = function (canvas, guidelines, setGuidelines) {
    if (!canvas)
        return;
    // Mevcut event listener'ları temizle
    canvas.off("object:moving");
    canvas.off("object:modified");
    canvas.off("mouse:up");
    // Yeni event listener'ları ekle
    canvas.on("object:moving", function (e) {
        if (e.target) {
            (0, exports.handleObjectMoving)(canvas, e.target, guidelines, setGuidelines);
        }
    });
    canvas.on("object:modified", function () {
        (0, exports.clearGuidelines)(canvas, guidelines, setGuidelines);
    });
    canvas.on("mouse:up", function () {
        (0, exports.clearGuidelines)(canvas, guidelines, setGuidelines);
    });
    // Cleanup fonksiyonunu döndür
    return function () {
        canvas.off("object:moving");
        canvas.off("object:modified");
        canvas.off("mouse:up");
    };
};
exports.setupCanvasEvents = setupCanvasEvents;
// React component'inde kullanımı için örnek:
/*
useEffect(() => {
  if (canvas) {
    const cleanup = setupCanvasEvents(canvas, guidelines, setGuidelines);
    return cleanup;
  }
}, [canvas]);
*/
