"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchIcons = void 0;
var fontawesome_svg_core_1 = require("@fortawesome/fontawesome-svg-core");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var free_brands_svg_icons_1 = require("@fortawesome/free-brands-svg-icons");
// Font Awesome kütüphanesini yükle
fontawesome_svg_core_1.library.add(free_solid_svg_icons_1.fas, free_brands_svg_icons_1.fab);
var searchIcons = function (query) {
    var allIcons = __spreadArray(__spreadArray([], Object.entries(free_solid_svg_icons_1.fas).map(function (_a) {
        var name = _a[0], icon = _a[1];
        return ({
            id: name,
            icon: icon,
            type: "solid",
        });
    }), true), Object.entries(free_brands_svg_icons_1.fab).map(function (_a) {
        var name = _a[0], icon = _a[1];
        return ({
            id: name,
            icon: icon,
            type: "brand",
        });
    }), true);
    if (!query) {
        return allIcons.slice(0, 52); // İlk 28 ikonu göster
    }
    return allIcons
        .filter(function (item) { return item.id.toLowerCase().includes(query.toLowerCase()); })
        .slice(0, 45);
};
exports.searchIcons = searchIcons;
//# sourceMappingURL=iconService.js.map