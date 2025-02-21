"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSidebarState = void 0;
var react_1 = require("react");
var useSidebarState = function () {
    var _a = (0, react_1.useState)(false), isIconDrawerOpen = _a[0], setIsIconDrawerOpen = _a[1];
    var _b = (0, react_1.useState)(false), isHeadlineDrawerOpen = _b[0], setIsHeadlineDrawerOpen = _b[1];
    return {
        isIconDrawerOpen: isIconDrawerOpen,
        setIsIconDrawerOpen: setIsIconDrawerOpen,
        isHeadlineDrawerOpen: isHeadlineDrawerOpen,
        setIsHeadlineDrawerOpen: setIsHeadlineDrawerOpen,
    };
};
exports.useSidebarState = useSidebarState;
//# sourceMappingURL=useSidebarState.js.map