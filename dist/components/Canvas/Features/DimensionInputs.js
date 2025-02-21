"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DimensionInputs = void 0;
var react_1 = __importDefault(require("react"));
var input_1 = require("../../ui/input");
var label_1 = require("../../ui/label");
var DimensionInputs = function (_a) {
    var objectType = _a.objectType, width = _a.width, height = _a.height, diameter = _a.diameter, onWidthChange = _a.onWidthChange, onHeightChange = _a.onHeightChange, onDiameterChange = _a.onDiameterChange;
    if (objectType === "rect" || objectType === "image") {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "flex items-center space-x-2" },
                react_1.default.createElement(label_1.Label, { htmlFor: "width" }, "W:"),
                react_1.default.createElement(input_1.Input, { id: "width", value: width, onChange: onWidthChange, className: "w-20" })),
            react_1.default.createElement("div", { className: "flex items-center space-x-2" },
                react_1.default.createElement(label_1.Label, { htmlFor: "height" }, "H:"),
                react_1.default.createElement(input_1.Input, { id: "height", value: height, onChange: onHeightChange, className: "w-20" }))));
    }
    if (objectType === "circle") {
        return (react_1.default.createElement("div", { className: "flex items-center space-x-2" },
            react_1.default.createElement(label_1.Label, { htmlFor: "diameter" }, "\u00C7ap:"),
            react_1.default.createElement(input_1.Input, { id: "diameter", value: diameter, onChange: onDiameterChange, className: "w-20" })));
    }
    return null;
};
exports.DimensionInputs = DimensionInputs;
