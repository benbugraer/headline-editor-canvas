"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextFormattingControls = void 0;
var react_1 = __importDefault(require("react"));
var button_1 = require("../../../components/ui/button");
var fa_1 = require("react-icons/fa");
var clsx_1 = __importDefault(require("clsx"));
var TextFormattingControls = function (_a) {
    var textFormatting = _a.textFormatting, updateTextFormatting = _a.updateTextFormatting;
    var formatButtons = [
        { id: "bold", icon: fa_1.FaBold, property: "bold" },
        { id: "italic", icon: fa_1.FaItalic, property: "italic" },
        { id: "underline", icon: fa_1.FaUnderline, property: "underline" },
        { id: "strikethrough", icon: fa_1.FaStrikethrough, property: "strikethrough" },
    ];
    var alignButtons = [
        { id: "left-align", icon: fa_1.FaAlignLeft, align: "left" },
        { id: "center-align", icon: fa_1.FaAlignCenter, align: "center" },
        { id: "right-align", icon: fa_1.FaAlignRight, align: "right" },
        { id: "justify-align", icon: fa_1.FaAlignJustify, align: "justify" },
    ];
    return (react_1.default.createElement("div", { className: "flex items-center space-x-2" },
        formatButtons.map(function (_a) {
            var id = _a.id, Icon = _a.icon, property = _a.property;
            return (react_1.default.createElement(button_1.Button, { key: id, id: "".concat(id, "-mode"), variant: "ghost", size: "icon", className: (0, clsx_1.default)("bg-transparent hover:bg-none", textFormatting[property] && "bg-tertiary"), onClick: function () {
                    return updateTextFormatting(property, !textFormatting[property]);
                } },
                react_1.default.createElement(Icon, null)));
        }),
        alignButtons.map(function (_a) {
            var id = _a.id, Icon = _a.icon, align = _a.align;
            return (react_1.default.createElement(button_1.Button, { key: id, id: "".concat(id, "-mode"), variant: "ghost", size: "icon", className: (0, clsx_1.default)("bg-transparent hover:bg-none", textFormatting.textAlign === align &&
                    "bg-tertiary"), onClick: function () {
                    return updateTextFormatting("textAlign", align);
                } },
                react_1.default.createElement(Icon, null)));
        })));
};
exports.TextFormattingControls = TextFormattingControls;
