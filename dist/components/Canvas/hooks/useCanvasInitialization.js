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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
        // Canvas initialization with strict configuration
        var initCanvas = new fabric_1.Canvas(canvasRef.current, __assign(__assign({}, config), { selection: true, preserveObjectStacking: true, enableRetinaScaling: true, stopContextMenu: true, fireRightClick: true }));
        // Initial render
        initCanvas.renderAll();
        setCanvas(initCanvas);
        // Event handler functions with proper typing
        function objectMovingHandler() {
            var activeObject = this.getActiveObject();
            if (!activeObject)
                return;
            try {
                (0, snapping_1.handleObjectMoving)(this, activeObject, guidelines, setGuidelines);
            }
            catch (error) {
                console.error("Error in object moving handler:", error);
            }
        }
        function objectModifiedHandler() {
            try {
                (0, snapping_1.clearGuidelines)(this, guidelines, setGuidelines);
            }
            catch (error) {
                console.error("Error in object modified handler:", error);
            }
        }
        var handlePaste = function (event) { return __awaiter(void 0, void 0, void 0, function () {
            var clipboardItems, _loop_1, i, state_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        event.preventDefault();
                        clipboardItems = (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.items;
                        if (!clipboardItems)
                            return [2 /*return*/];
                        _loop_1 = function (i) {
                            var item, blob, blobUrl_1, loadImage, img, scale, fabricImage, error_1;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        item = clipboardItems[i];
                                        if (!(item.type.indexOf("image") !== -1)) return [3 /*break*/, 8];
                                        _c.label = 1;
                                    case 1:
                                        _c.trys.push([1, 6, , 7]);
                                        blob = item.getAsFile();
                                        if (!blob)
                                            return [2 /*return*/, "continue"];
                                        blobUrl_1 = URL.createObjectURL(blob);
                                        loadImage = function () {
                                            return new Promise(function (resolve, reject) {
                                                var img = new Image();
                                                img.onload = function () { return resolve(img); };
                                                img.onerror = function () { return reject(new Error("Failed to load image")); };
                                                img.src = blobUrl_1;
                                            });
                                        };
                                        _c.label = 2;
                                    case 2:
                                        _c.trys.push([2, , 4, 5]);
                                        return [4 /*yield*/, loadImage()];
                                    case 3:
                                        img = _c.sent();
                                        scale = Math.min((initCanvas.width * 0.8) / img.width, (initCanvas.height * 0.8) / img.height, 1);
                                        fabricImage = new fabric_1.Image(img, {
                                            left: (initCanvas.width - img.width * scale) / 2,
                                            top: (initCanvas.height - img.height * scale) / 2,
                                            scaleX: scale,
                                            scaleY: scale,
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
                                        return [3 /*break*/, 5];
                                    case 4:
                                        URL.revokeObjectURL(blobUrl_1);
                                        return [7 /*endfinally*/];
                                    case 5: return [3 /*break*/, 7];
                                    case 6:
                                        error_1 = _c.sent();
                                        console.error("Error handling pasted image:", error_1);
                                        return [3 /*break*/, 7];
                                    case 7: return [2 /*return*/, "break"];
                                    case 8: return [2 /*return*/];
                                }
                            });
                        };
                        i = 0;
                        _b.label = 1;
                    case 1:
                        if (!(i < clipboardItems.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(i)];
                    case 2:
                        state_1 = _b.sent();
                        if (state_1 === "break")
                            return [3 /*break*/, 4];
                        _b.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        // Add event listeners with error boundaries
        try {
            initCanvas.on("object:moving", objectMovingHandler.bind(initCanvas));
            initCanvas.on("object:modified", objectModifiedHandler.bind(initCanvas));
            window.addEventListener("paste", handlePaste);
        }
        catch (error) {
            console.error("Error setting up event listeners:", error);
        }
        // Cleanup function
        return function () {
            try {
                // Remove event listeners
                initCanvas.off("object:moving", objectMovingHandler.bind(initCanvas));
                initCanvas.off("object:modified", objectModifiedHandler.bind(initCanvas));
                window.removeEventListener("paste", handlePaste);
                // Clear all objects
                initCanvas.getObjects().forEach(function (obj) {
                    try {
                        initCanvas.remove(obj);
                    }
                    catch (error) {
                        console.error("Error removing object:", error);
                    }
                });
                // Dispose canvas
                initCanvas.dispose();
                // Clear canvas reference
                setCanvas(null);
            }
            catch (error) {
                console.error("Error in cleanup:", error);
            }
        };
    }, []); // Empty dependency array since we only want to initialize once
};
exports.useCanvasInitialization = useCanvasInitialization;
