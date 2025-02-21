"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconPicker = IconPicker;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var iconService_1 = require("@/services/iconService");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
function IconPicker(_a) {
    var onIconSelect = _a.onIconSelect;
    var _b = (0, react_1.useState)(""), searchQuery = _b[0], setSearchQuery = _b[1];
    var _c = (0, react_1.useState)((0, iconService_1.searchIcons)("")), icons = _c[0], setIcons = _c[1];
    var handleSearch = function (query) {
        var results = (0, iconService_1.searchIcons)(query);
        setIcons(results);
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "", children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 items-center justify-center text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex gap-2 mb-4 w-11/12 ", children: (0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "\u0130kon Ara", value: searchQuery, onChange: function (e) {
                            setSearchQuery(e.target.value);
                            handleSearch(e.target.value);
                        } }) }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-4 gap-2 overflow-y-auto", children: icons.map(function (icon) { return ((0, jsx_runtime_1.jsx)(button_1.Button, { className: "h-12 w-12 p-0 bg-tertiary text-primary hover:bg-white duration-150 ease-linear", onClick: function () {
                            var path = icon.icon.icon[4];
                            onIconSelect(path, "#000000");
                        }, children: (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: icon.icon, className: "h-6 w-6" }) }, icon.id)); }) })] }) }));
}
//# sourceMappingURL=IconPicker.js.map