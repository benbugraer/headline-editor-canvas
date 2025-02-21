"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.layerManagement = void 0;
exports.layerManagement = {
    moveObjectUp: function (canvas, object) {
        if (!canvas || !object)
            return;
        canvas.bringObjectForward(object);
    },
    moveObjectDown: function (canvas, object) {
        if (!canvas || !object)
            return;
        canvas.sendObjectBackwards(object);
    },
    moveObjectToTop: function (canvas, object) {
        if (!canvas || !object)
            return;
        canvas.bringObjectToFront(object);
    },
    moveObjectToBottom: function (canvas, object) {
        if (!canvas || !object)
            return;
        canvas.sendObjectToBack(object);
    },
    alignObject: function (canvas, object, align) {
        if (!canvas || !object)
            return;
        var canvasWidth = canvas.width || 0;
        var canvasHeight = canvas.height || 0;
        switch (align) {
            case "left":
                object.set({ left: 0 });
                break;
            case "center":
                object.set({ left: (canvasWidth - object.width) / 2 });
                break;
            case "right":
                object.set({ left: canvasWidth - object.width });
                break;
            case "top":
                object.set({ top: 0 });
                break;
            case "middle":
                object.set({ top: (canvasHeight - object.height) / 2 });
                break;
            case "bottom":
                object.set({ top: canvasHeight - object.height });
                break;
        }
        object.setCoords(); // Update object coordinates
        canvas.renderAll();
    },
};
