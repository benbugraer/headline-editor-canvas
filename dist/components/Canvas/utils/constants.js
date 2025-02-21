"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALIGN_ACTIONS = exports.LAYER_ACTIONS = exports.GUIDELINE_STYLES = exports.SNAPPING_CONFIG = exports.CANVAS_DEFAULT_CONFIG = exports.HEADLINE_SIZES = void 0;
var lu_1 = require("react-icons/lu");
var ci_1 = require("react-icons/ci");
exports.HEADLINE_SIZES = {
    square: {
        label: "Kare Manşet",
        width: 547,
        height: 574,
    },
    wide: {
        label: "Geniş Manşet",
        width: 979,
        height: 550,
    },
    default: {
        label: "Varsayılan(20'lik Manşet)",
        width: 868,
        height: 488,
    },
};
exports.CANVAS_DEFAULT_CONFIG = {
    width: exports.HEADLINE_SIZES.default.width,
    height: exports.HEADLINE_SIZES.default.height,
    backgroundColor: "#fff",
};
exports.SNAPPING_CONFIG = {
    snappingDistance: 10,
};
exports.GUIDELINE_STYLES = {
    stroke: "blue",
    strokeWidth: 1,
    selectable: false,
    evented: false,
    strokeDashArray: [5, 5],
    opacity: 0.8,
};
exports.LAYER_ACTIONS = [
    { action: "up", icon: lu_1.LuChevronUp, label: "Up" },
    { action: "down", icon: lu_1.LuChevronDown, label: "Down" },
    { action: "top", icon: lu_1.LuChevronsUp, label: "To forward" },
    { action: "bottom", icon: lu_1.LuChevronsDown, label: "To bottom" },
];
exports.ALIGN_ACTIONS = [
    { align: "left", icon: ci_1.CiAlignLeft },
    { align: "center", icon: ci_1.CiAlignCenterH },
    { align: "right", icon: ci_1.CiAlignRight },
    { align: "top", icon: ci_1.CiAlignTop },
    { align: "middle", icon: ci_1.CiAlignCenterV },
    { align: "bottom", icon: ci_1.CiAlignBottom },
];
