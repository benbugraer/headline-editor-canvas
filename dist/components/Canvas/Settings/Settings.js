"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Settings;
var react_1 = __importStar(require("react"));
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var useObjectSelection_1 = require("../hooks/useObjectSelection");
var useTextFormatting_1 = require("../hooks/useTextFormatting");
var DimensionInputs_1 = require("../Features/DimensionInputs");
var ColorPicker_1 = require("../Features/ColorPicker");
var TextFormattingControls_1 = require("../Features/TextFormattingControls");
var FontFamilySelect_1 = require("../Features/FontFamilySelect");
var fonts_1 = require("../lib/fonts");
var fi_1 = require("react-icons/fi");
var button_1 = require("@/components/ui/button");
var useCanvasEvents_1 = require("../hooks/useCanvasEvents");
var LayerManagement_1 = require("../utils/LayerManagement");
var LayerControls_1 = require("../Features/LayerControls");
// import TransparencyControl from "../Features/TransparencyControl";
var Effects_1 = __importDefault(require("../Features/Effects"));
var TextSpacingControls_1 = require("../Features/TextSpacingControls");
function Settings(_a) {
    var canvas = _a.canvas;
    var _b = (0, useObjectSelection_1.useObjectSelection)(canvas), selectedObject = _b.selectedObject, width = _b.width, height = _b.height, diameter = _b.diameter, color = _b.color, 
    // opacity,
    fontSize = _b.fontSize, fontFamily = _b.fontFamily, handleObjectSelection = _b.handleObjectSelection, handleWidthChange = _b.handleWidthChange, handleHeightChange = _b.handleHeightChange, handleDiameterChange = _b.handleDiameterChange, handleColorChange = _b.handleColorChange, handleFontSizeChange = _b.handleFontSizeChange, handleFontFamilyChange = _b.handleFontFamilyChange, 
    // handleOpacityChange,
    lineHeight = _b.lineHeight, letterSpacing = _b.letterSpacing, handleLineHeightChange = _b.handleLineHeightChange, handleLetterSpacingChange = _b.handleLetterSpacingChange;
    var _c = (0, useTextFormatting_1.useTextFormatting)(canvas, selectedObject), textFormatting = _c.textFormatting, updateTextFormatting = _c.updateTextFormatting;
    var _d = (0, react_1.useState)("#ffffff"), backgroundColor = _d[0], setBackgroundColor = _d[1];
    var clearSettings = (0, react_1.useCallback)(function () {
        handleObjectSelection(null);
    }, [handleObjectSelection]);
    var handleDeleteObject = (0, react_1.useCallback)(function () {
        if (!canvas)
            return;
        var activeObjects = canvas.getActiveObjects();
        if (activeObjects.length > 0) {
            canvas.discardActiveObject();
            activeObjects.forEach(function (obj) {
                canvas.remove(obj);
            });
        }
        else if (selectedObject) {
            canvas.remove(selectedObject);
        }
        canvas.requestRenderAll();
        clearSettings();
    }, [canvas, selectedObject, clearSettings]);
    (0, useCanvasEvents_1.useCanvasEvents)(canvas, handleObjectSelection, clearSettings);
    (0, react_1.useEffect)(function () {
        var handleKeyDown = function (event) {
            if (event.key === "Delete") {
                handleDeleteObject();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return function () {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleDeleteObject]);
    var handleBackgroundColorChange = function (colorResult) {
        var color = colorResult.hex;
        setBackgroundColor(color);
        if (canvas) {
            canvas.set("backgroundColor", color); // Doğru yöntem
            canvas.renderAll(); // Değişiklikleri uygula
        }
    };
    var handleAlignChange = (0, react_1.useCallback)(function (align) {
        if (!canvas || !selectedObject)
            return;
        LayerManagement_1.layerManagement.alignObject(canvas, selectedObject, align);
    }, [canvas, selectedObject]);
    var handleLayerChange = (0, react_1.useCallback)(function (action) {
        if (!canvas || !selectedObject)
            return;
        switch (action) {
            case "up":
                LayerManagement_1.layerManagement.moveObjectUp(canvas, selectedObject);
                break;
            case "down":
                LayerManagement_1.layerManagement.moveObjectDown(canvas, selectedObject);
                break;
            case "top":
                LayerManagement_1.layerManagement.moveObjectToTop(canvas, selectedObject);
                break;
            case "bottom":
                LayerManagement_1.layerManagement.moveObjectToBottom(canvas, selectedObject);
                break;
        }
    }, [canvas, selectedObject]);
    return (react_1.default.createElement("div", { className: "w-full overflow-hidden" }, selectedObject ? (react_1.default.createElement("div", { className: "min-w-[60px] h-[60px] border-b bg-secondary border-primary transition-all duration-300 text-primary p-2 flex items-center space-x-4" },
        react_1.default.createElement(ColorPicker_1.ColorPicker, { color: color, onChange: handleColorChange }),
        react_1.default.createElement(DimensionInputs_1.DimensionInputs, { objectType: selectedObject.type, width: width, height: height, diameter: diameter, onWidthChange: handleWidthChange, onHeightChange: handleHeightChange, onDiameterChange: handleDiameterChange }),
        selectedObject.type === "i-text" && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "flex items-center space-x-2" },
                react_1.default.createElement(label_1.Label, { htmlFor: "fontSize" }, "Yaz\u0131 Boyutu:"),
                react_1.default.createElement(input_1.Input, { id: "fontSize", value: fontSize === 0 ? "" : fontSize, onChange: handleFontSizeChange, className: "w-20" })),
            react_1.default.createElement(FontFamilySelect_1.FontFamilySelect, { value: fontFamily, onValueChange: function (newFont) {
                    var _a;
                    var selectedFontFamily = (_a = fonts_1.fontFamilies.find(function (font) { return font.name === newFont; })) === null || _a === void 0 ? void 0 : _a.family;
                    handleFontFamilyChange(selectedFontFamily || newFont);
                } }),
            react_1.default.createElement(TextFormattingControls_1.TextFormattingControls, { textFormatting: textFormatting, updateTextFormatting: updateTextFormatting }),
            react_1.default.createElement(TextSpacingControls_1.TextSpacingControls, { lineHeight: lineHeight, letterSpacing: letterSpacing || 0, onLineHeightChange: handleLineHeightChange, onLetterSpacingChange: handleLetterSpacingChange }))),
        react_1.default.createElement(LayerControls_1.LayerControls, { onAlignChange: handleAlignChange, onLayerChange: handleLayerChange }),
        react_1.default.createElement(Effects_1.default, { selectedObject: selectedObject, canvas: canvas, onObjectUpdate: function () {
                canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
            } }),
        react_1.default.createElement(button_1.Button, { onClick: handleDeleteObject, disabled: !selectedObject, className: "p-2 rounded-md", variant: "destructive", size: "icon" },
            react_1.default.createElement(fi_1.FiTrash2, null)))) : (react_1.default.createElement("div", { className: "min-w-[60px] h-[60px] border-b bg-secondary border-primary transition-all duration-300 text-primary p-2 flex items-center space-x-4" },
        react_1.default.createElement("div", { className: "flex items-center space-x-2" },
            react_1.default.createElement(ColorPicker_1.ColorPicker, { color: backgroundColor, onChange: handleBackgroundColorChange }))))));
}
