"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useObjectSelection = void 0;
var react_1 = require("react");
var useObjectSelection = function (canvas) {
    var _a = (0, react_1.useState)(null), selectedObject = _a[0], setSelectedObject = _a[1];
    var _b = (0, react_1.useState)(""), width = _b[0], setWidth = _b[1];
    var _c = (0, react_1.useState)(""), height = _c[0], setHeight = _c[1];
    var _d = (0, react_1.useState)(""), diameter = _d[0], setDiameter = _d[1];
    var _e = (0, react_1.useState)("#000"), color = _e[0], setColor = _e[1];
    var _f = (0, react_1.useState)(20), fontSize = _f[0], setFontSize = _f[1];
    var _g = (0, react_1.useState)("Arial"), fontFamily = _g[0], setFontFamily = _g[1];
    var _h = (0, react_1.useState)(100), opacity = _h[0], setOpacity = _h[1];
    var _j = (0, react_1.useState)(1.2), lineHeight = _j[0], setLineHeight = _j[1];
    var _k = (0, react_1.useState)(0), letterSpacing = _k[0], setLetterSpacing = _k[1];
    var handleObjectSelection = (0, react_1.useCallback)(function (object) {
        setSelectedObject(object);
        if (object) {
            // Mevcut opacity değerini 0-100 aralığına dönüştür
            setOpacity(object.opacity ? object.opacity * 100 : 100);
            if (object.type === "rect" || object.type === "image") {
                setWidth(Math.round(object.width * object.scaleX).toString());
                setHeight(Math.round(object.height * object.scaleY).toString());
                setColor(object.fill);
                setDiameter("");
            }
            else if (object.type === "circle") {
                var circle = object;
                setDiameter(Math.round(circle.radius * 2 * circle.scaleX).toString());
                setColor(circle.fill);
                setWidth("");
                setHeight("");
            }
            else if (object.type === "i-text") {
                var text = object;
                setColor(text.fill);
                setFontSize(text.fontSize);
            }
        }
        else {
            // Reset all values when no object is selected
            setWidth("");
            setHeight("");
            setDiameter("");
            setColor("#000");
            setFontSize(20);
            setOpacity(100);
        }
    }, []);
    var handleOpacityChange = (0, react_1.useCallback)(function (value) {
        if (selectedObject) {
            // Opacity değerini 0-1 aralığına dönüştür
            var opacityValue = value / 100;
            setOpacity(value);
            selectedObject.set("opacity", opacityValue);
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        }
    }, [selectedObject, canvas]);
    var handleWidthChange = (0, react_1.useCallback)(function (e) {
        var value = e.target.value.replace(/,/g, "");
        var intValue = parseInt(value, 10);
        setWidth(value);
        if (selectedObject &&
            (selectedObject.type === "rect" || selectedObject.type === "image") &&
            !isNaN(intValue) &&
            intValue >= 0) {
            selectedObject.set({ width: intValue / selectedObject.scaleX });
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        }
    }, [selectedObject, canvas]);
    var handleHeightChange = (0, react_1.useCallback)(function (e) {
        var value = e.target.value.replace(/,/g, "");
        var intValue = parseInt(value, 10);
        setHeight(value);
        if (selectedObject &&
            (selectedObject.type === "rect" || selectedObject.type === "image") &&
            !isNaN(intValue) &&
            intValue >= 0) {
            selectedObject.set({ height: intValue / selectedObject.scaleY });
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        }
    }, [selectedObject, canvas]);
    var handleDiameterChange = (0, react_1.useCallback)(function (e) {
        var value = e.target.value.replace(/,/g, "");
        var intValue = parseInt(value, 10);
        setDiameter(value);
        if (selectedObject &&
            selectedObject.type === "circle" &&
            !isNaN(intValue) &&
            intValue >= 0) {
            selectedObject.set({
                radius: intValue / 2 / selectedObject.scaleX,
            });
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        }
    }, [selectedObject, canvas]);
    var handleColorChange = (0, react_1.useCallback)(function (color) {
        setColor(color.hex);
        if (selectedObject) {
            selectedObject.set({ fill: color.hex });
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        }
    }, [selectedObject, canvas]);
    var handleFontSizeChange = (0, react_1.useCallback)(function (e) {
        var value = e.target.value;
        if (value === "") {
            setFontSize(0);
            return;
        }
        var intValue = parseInt(value, 10);
        if (!isNaN(intValue)) {
            setFontSize(intValue);
            if (selectedObject && selectedObject.type === "i-text") {
                selectedObject.set({ fontSize: intValue });
                canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
            }
        }
    }, [selectedObject, canvas]);
    var handleFontFamilyChange = (0, react_1.useCallback)(function (newFontFamily) {
        if (!selectedObject || !canvas)
            return;
        if (selectedObject.type === "i-text") {
            selectedObject.set("fontFamily", newFontFamily);
            canvas.requestRenderAll();
            setFontFamily(newFontFamily);
        }
    }, [selectedObject, canvas]);
    var handleLineHeightChange = (0, react_1.useCallback)(function (value) {
        if (!selectedObject || !canvas)
            return;
        if (selectedObject.type === "i-text") {
            selectedObject.set("lineHeight", value);
            setLineHeight(value);
            canvas.renderAll();
        }
    }, [canvas, selectedObject]);
    var handleLetterSpacingChange = (0, react_1.useCallback)(function (value) {
        if (!selectedObject || !canvas)
            return;
        if (selectedObject.type === "i-text") {
            // 0 normal aralık olacak
            // Negatif değerler (-50'ye kadar) harfleri yakınlaştıracak
            // Pozitif değerler (250'ye kadar) harfleri uzaklaştıracak
            var scaledValue = void 0;
            if (value < 0) {
                // -50 -> -100 (harfler birbirine çok yakın)
                scaledValue = (value / -50) * -500;
            }
            else if (value > 0) {
                // 0 -> 1000 (harfler birbirinden uzak)
                scaledValue = value * 25;
            }
            else {
                // 0 -> normal aralık
                scaledValue = 0;
            }
            selectedObject.set("charSpacing", scaledValue);
            setLetterSpacing(value);
            canvas.renderAll();
        }
    }, [canvas, selectedObject]);
    (0, react_1.useEffect)(function () {
        if (selectedObject && selectedObject.type === "i-text") {
            var textObject = selectedObject;
            setFontFamily(textObject.fontFamily || "Arial");
            setLineHeight(textObject.lineHeight || 1.2);
            setLetterSpacing(textObject.charSpacing || 0);
        }
    }, [selectedObject]);
    return {
        selectedObject: selectedObject,
        width: width,
        height: height,
        diameter: diameter,
        color: color,
        opacity: opacity,
        fontSize: fontSize,
        fontFamily: fontFamily,
        lineHeight: lineHeight,
        letterSpacing: letterSpacing,
        handleObjectSelection: handleObjectSelection,
        handleWidthChange: handleWidthChange,
        handleHeightChange: handleHeightChange,
        handleDiameterChange: handleDiameterChange,
        handleColorChange: handleColorChange,
        handleFontSizeChange: handleFontSizeChange,
        handleFontFamilyChange: handleFontFamilyChange,
        handleOpacityChange: handleOpacityChange,
        handleLineHeightChange: handleLineHeightChange,
        handleLetterSpacingChange: handleLetterSpacingChange,
    };
};
exports.useObjectSelection = useObjectSelection;
//# sourceMappingURL=useObjectSelection.js.map