"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayerControls = LayerControls;
var react_1 = __importDefault(require("react"));
var button_1 = require("../../ui/button");
var popover_1 = require("../../ui/popover");
var lucide_react_1 = require("lucide-react");
var constants_1 = require("../utils/constants");
var LayerButton = function (_a) {
    var Icon = _a.icon, label = _a.label, onClick = _a.onClick;
    return (react_1.default.createElement(button_1.Button, { variant: "secondary", size: "sm", onClick: onClick, className: "flex items-center gap-2" },
        react_1.default.createElement(Icon, { className: "h-4 w-4" }),
        label));
};
function LayerControls(_a) {
    var onLayerChange = _a.onLayerChange, onAlignChange = _a.onAlignChange;
    return (react_1.default.createElement(popover_1.Popover, null,
        react_1.default.createElement(popover_1.PopoverTrigger, { asChild: true },
            react_1.default.createElement(button_1.Button, { variant: "outline", size: "icon" },
                react_1.default.createElement(lucide_react_1.Layers, { className: "h-4 w-4" }))),
        react_1.default.createElement(popover_1.PopoverContent, { className: "w-64", sideOffset: 5 },
            react_1.default.createElement("div", { className: "grid gap-4" },
                react_1.default.createElement("div", { className: "space-y-2" },
                    react_1.default.createElement("h4", { className: "font-medium leading-none" }, "Katmanlar"),
                    react_1.default.createElement("div", { className: "grid grid-cols-2 gap-2" }, constants_1.LAYER_ACTIONS.map(function (_a) {
                        var action = _a.action, icon = _a.icon, label = _a.label;
                        return (react_1.default.createElement(LayerButton, { key: action, icon: icon, label: label, onClick: function () {
                                onLayerChange(action);
                                requestAnimationFrame(function () {
                                    document.dispatchEvent(new Event("layerChanged"));
                                });
                            } }));
                    }))),
                react_1.default.createElement("div", { className: "space-y-2" },
                    react_1.default.createElement("h4", { className: "font-medium leading-none" }, "Pozisyon"),
                    react_1.default.createElement("div", { className: "grid grid-cols-3 gap-2" }, constants_1.ALIGN_ACTIONS.map(function (_a) {
                        var align = _a.align, icon = _a.icon;
                        return (react_1.default.createElement(LayerButton, { key: align, icon: icon, onClick: function () {
                                onAlignChange(align);
                                requestAnimationFrame(function () {
                                    document.dispatchEvent(new Event("layerChanged"));
                                });
                            } }));
                    })))))));
}
