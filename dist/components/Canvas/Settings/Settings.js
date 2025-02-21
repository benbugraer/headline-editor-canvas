"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Settings;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
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
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full overflow-hidden", children: selectedObject ? ((0, jsx_runtime_1.jsxs)("div", { className: "min-w-[60px] h-[60px] border-b bg-secondary border-primary transition-all duration-300 text-primary p-2 flex items-center space-x-4", children: [(0, jsx_runtime_1.jsx)(ColorPicker_1.ColorPicker, { color: color, onChange: handleColorChange }), (0, jsx_runtime_1.jsx)(DimensionInputs_1.DimensionInputs, { objectType: selectedObject.type, width: width, height: height, diameter: diameter, onWidthChange: handleWidthChange, onHeightChange: handleHeightChange, onDiameterChange: handleDiameterChange }), selectedObject.type === "i-text" && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "fontSize", children: "Yaz\u0131 Boyutu:" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "fontSize", value: fontSize === 0 ? "" : fontSize, onChange: handleFontSizeChange, className: "w-20" })] }), (0, jsx_runtime_1.jsx)(FontFamilySelect_1.FontFamilySelect, { value: fontFamily, onValueChange: function (newFont) {
                                var _a;
                                var selectedFontFamily = (_a = fonts_1.fontFamilies.find(function (font) { return font.name === newFont; })) === null || _a === void 0 ? void 0 : _a.family;
                                handleFontFamilyChange(selectedFontFamily || newFont);
                            } }), (0, jsx_runtime_1.jsx)(TextFormattingControls_1.TextFormattingControls, { textFormatting: textFormatting, updateTextFormatting: updateTextFormatting }), (0, jsx_runtime_1.jsx)(TextSpacingControls_1.TextSpacingControls, { lineHeight: lineHeight, letterSpacing: letterSpacing || 0, onLineHeightChange: handleLineHeightChange, onLetterSpacingChange: handleLetterSpacingChange })] })), (0, jsx_runtime_1.jsx)(LayerControls_1.LayerControls, { onAlignChange: handleAlignChange, onLayerChange: handleLayerChange }), (0, jsx_runtime_1.jsx)(Effects_1.default, { selectedObject: selectedObject, canvas: canvas, onObjectUpdate: function () {
                        canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
                    } }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleDeleteObject, disabled: !selectedObject, className: "p-2 rounded-md", variant: "destructive", size: "icon", children: (0, jsx_runtime_1.jsx)(fi_1.FiTrash2, {}) })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "min-w-[60px] h-[60px] border-b bg-secondary border-primary transition-all duration-300 text-primary p-2 flex items-center space-x-4", children: (0, jsx_runtime_1.jsx)("div", { className: "flex items-center space-x-2", children: (0, jsx_runtime_1.jsx)(ColorPicker_1.ColorPicker, { color: backgroundColor, onChange: handleBackgroundColorChange }) }) })) }));
}
//# sourceMappingURL=Settings.js.map