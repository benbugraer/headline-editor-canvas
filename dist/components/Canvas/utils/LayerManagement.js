"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.layerManagement = void 0;
exports.layerManagement = {
    moveObjectUp: function (canvas, object) {
        if (!canvas || !object || typeof window === "undefined")
            return;
        try {
            canvas.bringForward(object);
            canvas.renderAll();
        }
        catch (error) {
            console.error("Error moving object up:", error);
        }
    },
    moveObjectDown: function (canvas, object) {
        if (!canvas || !object || typeof window === "undefined")
            return;
        try {
            canvas.sendBackwards(object);
            canvas.renderAll();
        }
        catch (error) {
            console.error("Error moving object down:", error);
        }
    },
    moveObjectToTop: function (canvas, object) {
        if (!canvas || !object || typeof window === "undefined")
            return;
        try {
            canvas.bringToFront(object);
            canvas.renderAll();
        }
        catch (error) {
            console.error("Error moving object to top:", error);
        }
    },
    moveObjectToBottom: function (canvas, object) {
        if (!canvas || !object || typeof window === "undefined")
            return;
        try {
            canvas.sendToBack(object);
            canvas.renderAll();
        }
        catch (error) {
            console.error("Error moving object to bottom:", error);
        }
    },
    alignObject: function (canvas, object, align) {
        if (!canvas || !object || typeof window === "undefined")
            return;
        try {
            var canvasWidth = canvas.getWidth();
            var canvasHeight = canvas.getHeight();
            var objectWidth = object.getScaledWidth();
            var objectHeight = object.getScaledHeight();
            switch (align) {
                case "left":
                    object.set({ left: 0 });
                    break;
                case "center":
                    object.set({ left: (canvasWidth - objectWidth) / 2 });
                    break;
                case "right":
                    object.set({ left: canvasWidth - objectWidth });
                    break;
                case "top":
                    object.set({ top: 0 });
                    break;
                case "middle":
                    object.set({ top: (canvasHeight - objectHeight) / 2 });
                    break;
                case "bottom":
                    object.set({ top: canvasHeight - objectHeight });
                    break;
            }
            object.setCoords();
            canvas.renderAll();
        }
        catch (error) {
            console.error("Error aligning object:", error);
        }
    },
};
