"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextSpacingControls = TextSpacingControls;
var react_1 = __importDefault(require("react"));
var popover_1 = require("../../ui/popover");
var label_1 = require("../../ui/label");
var slider_1 = require("../../ui/slider");
var input_1 = require("../../ui/input");
var fa_1 = require("react-icons/fa");
var button_1 = require("../../ui/button");
function TextSpacingControls(_a) {
    var lineHeight = _a.lineHeight, _b = _a.letterSpacing, letterSpacing = _b === void 0 ? 0 : _b, onLineHeightChange = _a.onLineHeightChange, onLetterSpacingChange = _a.onLetterSpacingChange;
    var handleLetterSpacingInputChange = function (e) {
        var value = parseInt(e.target.value);
        if (!isNaN(value) && value >= -50 && value <= 250) {
            onLetterSpacingChange(value);
        }
    };
    return (react_1.default.createElement(popover_1.Popover, null,
        react_1.default.createElement(popover_1.PopoverTrigger, { asChild: true },
            react_1.default.createElement(button_1.Button, { variant: "outline", size: "icon" },
                react_1.default.createElement(fa_1.FaTextHeight, { className: "h-4 w-4" }))),
        react_1.default.createElement(popover_1.PopoverContent, { className: "w-80" },
            react_1.default.createElement("div", { className: "space-y-4" },
                react_1.default.createElement("div", { className: "space-y-2" },
                    react_1.default.createElement("div", { className: "flex items-center justify-between" },
                        react_1.default.createElement(label_1.Label, null, "Sat\u0131r Aral\u0131\u011F\u0131"),
                        react_1.default.createElement("span", { className: "text-sm text-muted-foreground" }, lineHeight.toFixed(1))),
                    react_1.default.createElement(slider_1.Slider, { value: [lineHeight], min: 0.5, max: 12, step: 0.1, onValueChange: function (value) { return onLineHeightChange(value[0]); } })),
                react_1.default.createElement("div", { className: "space-y-2" },
                    react_1.default.createElement("div", { className: "flex items-center justify-between" },
                        react_1.default.createElement(label_1.Label, null, "Harf Aral\u0131\u011F\u0131"),
                        react_1.default.createElement("div", { className: "flex items-center gap-2" },
                            react_1.default.createElement(input_1.Input, { type: "number", value: letterSpacing, onChange: handleLetterSpacingInputChange, className: "w-[70px]", min: -50, max: 250 }),
                            react_1.default.createElement("span", { className: "text-sm text-muted-foreground" }, "px"))),
                    react_1.default.createElement(slider_1.Slider, { value: [letterSpacing], min: -50, max: 250, step: 1, onValueChange: function (value) { return onLetterSpacingChange(value[0]); } }))))));
}
