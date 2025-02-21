"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCanvasEvents = useCanvasEvents;
/* eslint-disable @typescript-eslint/no-explicit-any */
var react_1 = require("react");
var lodash_1 = require("lodash");
var constants_1 = require("../utils/constants");
var snapping_1 = require("../utils/snapping");
function useCanvasEvents(canvas, handleObjectSelection, clearSettings) {
    var _a = (0, react_1.useState)([]), guidelines = _a[0], setGuidelines = _a[1];
    var guidelinesRef = (0, react_1.useRef)(guidelines);
    var isMovingRef = (0, react_1.useRef)(false);
    // Update ref when guidelines change
    (0, react_1.useEffect)(function () {
        guidelinesRef.current = guidelines;
    }, [guidelines]);
    // Memoized selection handler
    var handleSelection = (0, react_1.useCallback)(function (event) {
        try {
            var selected = event.selected;
            if (selected && selected.length > 0) {
                handleObjectSelection(selected[0]);
            }
            else {
                clearSettings();
            }
        }
        catch (error) {
            console.error("Error handling selection:", error);
            clearSettings();
        }
    }, [handleObjectSelection, clearSettings]);
    // Memoized modification handler
    var handleModification = (0, react_1.useCallback)(function (target) {
        try {
            handleObjectSelection(target);
        }
        catch (error) {
            console.error("Error handling object modification:", error);
        }
    }, [handleObjectSelection]);
    // Handle object movement with snapping
    var handleMoving = (0, react_1.useCallback)(function (event) {
        if (!canvas || !event.target)
            return;
        if (!isMovingRef.current) {
            isMovingRef.current = true;
            requestAnimationFrame(function () {
                (0, snapping_1.handleObjectMoving)(canvas, event.target, guidelinesRef.current, setGuidelines);
                isMovingRef.current = false;
            });
        }
    }, [canvas]);
    // Handle object modification
    var handleModified = (0, react_1.useCallback)(function () {
        if (!canvas)
            return;
        (0, snapping_1.clearGuidelines)(canvas, guidelinesRef.current, setGuidelines);
    }, [canvas]);
    // Handle mouse up
    var handleMouseUp = (0, react_1.useCallback)(function () {
        if (!canvas)
            return;
        (0, snapping_1.clearGuidelines)(canvas, guidelinesRef.current, setGuidelines);
    }, [canvas]);
    // Setup canvas events with cleanup
    (0, react_1.useEffect)(function () {
        if (!canvas)
            return;
        var debouncedSelection = (0, lodash_1.debounce)(handleSelection, 16);
        var debouncedModification = (0, lodash_1.debounce)(handleModification, 16);
        // Setup snapping
        canvas.set({
            snapAngle: 45,
            snapThreshold: constants_1.SNAPPING_CONFIG.snappingDistance,
        });
        // Bind events
        var bindEvents = function () {
            canvas.on("selection:created", debouncedSelection);
            canvas.on("selection:updated", debouncedSelection);
            canvas.on("selection:cleared", clearSettings);
            canvas.on("object:moving", handleMoving);
            canvas.on("object:modified", function (e) {
                if (e.target) {
                    debouncedModification(e.target);
                }
                handleModified();
            });
            canvas.on("mouse:up", handleMouseUp);
            canvas.on("object:scaling", function () { return canvas.requestRenderAll(); });
            canvas.on("object:rotating", function () { return canvas.requestRenderAll(); });
        };
        // Unbind events
        var unbindEvents = function () {
            canvas.off("selection:created", debouncedSelection);
            canvas.off("selection:updated", debouncedSelection);
            canvas.off("selection:cleared", clearSettings);
            canvas.off("object:moving", handleMoving);
            canvas.off("object:modified");
            canvas.off("mouse:up", handleMouseUp);
            canvas.off("object:scaling");
            canvas.off("object:rotating");
        };
        // Setup and cleanup
        bindEvents();
        return function () {
            debouncedSelection.cancel();
            debouncedModification.cancel();
            unbindEvents();
            if (canvas) {
                (0, snapping_1.clearGuidelines)(canvas, guidelinesRef.current, setGuidelines);
            }
        };
    }, [
        canvas,
        handleSelection,
        handleModification,
        clearSettings,
        handleMoving,
        handleModified,
        handleMouseUp,
    ]);
    return {
        guidelines: guidelines,
        setGuidelines: setGuidelines,
    };
}
//# sourceMappingURL=useCanvasEvents.js.map