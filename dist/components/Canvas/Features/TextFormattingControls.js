"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextFormattingControls = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
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
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [formatButtons.map(function (_a) {
                var id = _a.id, Icon = _a.icon, property = _a.property;
                return ((0, jsx_runtime_1.jsx)(button_1.Button, { id: "".concat(id, "-mode"), variant: "ghost", size: "icon", className: (0, clsx_1.default)("bg-transparent hover:bg-none", textFormatting[property] && "bg-tertiary"), onClick: function () {
                        return updateTextFormatting(property, !textFormatting[property]);
                    }, children: (0, jsx_runtime_1.jsx)(Icon, {}) }, id));
            }), alignButtons.map(function (_a) {
                var id = _a.id, Icon = _a.icon, align = _a.align;
                return ((0, jsx_runtime_1.jsx)(button_1.Button, { id: "".concat(id, "-mode"), variant: "ghost", size: "icon", className: (0, clsx_1.default)("bg-transparent hover:bg-none", textFormatting.textAlign === align && "bg-tertiary"), onClick: function () {
                        return updateTextFormatting("textAlign", align);
                    }, children: (0, jsx_runtime_1.jsx)(Icon, {}) }, id));
            })] }));
};
exports.TextFormattingControls = TextFormattingControls;
//# sourceMappingURL=TextFormattingControls.js.map