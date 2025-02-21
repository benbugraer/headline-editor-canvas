"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayerControls = LayerControls;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var popover_1 = require("@/components/ui/popover");
var lucide_react_1 = require("lucide-react");
var constants_1 = require("../utils/constants");
var LayerButton = function (_a) {
    var Icon = _a.icon, label = _a.label, onClick = _a.onClick;
    return ((0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "secondary", size: "sm", onClick: onClick, className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(Icon, { className: "h-4 w-4" }), label] }));
};
function LayerControls(_a) {
    var onLayerChange = _a.onLayerChange, onAlignChange = _a.onAlignChange;
    return ((0, jsx_runtime_1.jsxs)(popover_1.Popover, { children: [(0, jsx_runtime_1.jsx)(popover_1.PopoverTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "icon", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Layers, { className: "h-4 w-4" }) }) }), (0, jsx_runtime_1.jsx)(popover_1.PopoverContent, { className: "w-64", sideOffset: 5, children: (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-medium leading-none", children: "Katmanlar" }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-2 gap-2", children: constants_1.LAYER_ACTIONS.map(function (_a) {
                                        var action = _a.action, icon = _a.icon, label = _a.label;
                                        return ((0, jsx_runtime_1.jsx)(LayerButton, { icon: icon, label: label, onClick: function () {
                                                onLayerChange(action);
                                                requestAnimationFrame(function () {
                                                    document.dispatchEvent(new Event("layerChanged"));
                                                });
                                            } }, action));
                                    }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-medium leading-none", children: "Pozisyon" }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-3 gap-2", children: constants_1.ALIGN_ACTIONS.map(function (_a) {
                                        var align = _a.align, icon = _a.icon;
                                        return ((0, jsx_runtime_1.jsx)(LayerButton, { icon: icon, onClick: function () {
                                                onAlignChange(align);
                                                requestAnimationFrame(function () {
                                                    document.dispatchEvent(new Event("layerChanged"));
                                                });
                                            } }, align));
                                    }) })] })] }) })] }));
}
//# sourceMappingURL=LayerControls.js.map