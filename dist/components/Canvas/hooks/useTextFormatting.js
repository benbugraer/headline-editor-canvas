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
exports.useTextFormatting = void 0;
var react_1 = require("react");
var useTextFormatting = function (canvas, selectedObject) {
    var _a = (0, react_1.useState)({
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
        textAlign: "left",
    }), textFormatting = _a[0], setTextFormatting = _a[1];
    var updateTextFormatting = (0, react_1.useCallback)(function (property, value) {
        if (selectedObject && selectedObject.type === "i-text") {
            var text = selectedObject;
            switch (property) {
                case "bold":
                    text.set({ fontWeight: value ? "bold" : "normal" });
                    break;
                case "italic":
                    text.set({ fontStyle: value ? "italic" : "normal" });
                    break;
                case "underline":
                    text.set({ underline: value });
                    break;
                case "strikethrough":
                    text.set({ linethrough: value });
                    break;
                case "textAlign":
                    text.set({ textAlign: value });
                    break;
            }
            setTextFormatting(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[property] = value, _a)));
            });
            canvas === null || canvas === void 0 ? void 0 : canvas.renderAll();
        }
    }, [selectedObject, canvas]);
    return { textFormatting: textFormatting, updateTextFormatting: updateTextFormatting };
};
exports.useTextFormatting = useTextFormatting;
