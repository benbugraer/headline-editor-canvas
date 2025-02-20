/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useCallback, useState, useRef } from "react";
import {
  Object as FabricObject,
  FabricObjectProps,
  ObjectEvents,
  SerializedObjectProps,
  TPointerEvent,
  Canvas,
  ModifiedEvent,
} from "fabric";
import { debounce } from "lodash";
import { GuidelineType } from "../types/canvas.types";
import { SNAPPING_CONFIG } from "../utils/constants";
import { handleObjectMoving, clearGuidelines } from "../utils/snapping";

type SelectionEvent = {
  e: TPointerEvent;
  selected: FabricObject<
    Partial<FabricObjectProps>,
    SerializedObjectProps,
    ObjectEvents
  >[];
};

export function useCanvasEvents(
  canvas: Canvas | null,
  handleObjectSelection: (obj: FabricObject | null) => void,
  clearSettings: () => void
) {
  const [guidelines, setGuidelines] = useState<GuidelineType[]>([]);
  const guidelinesRef = useRef<GuidelineType[]>(guidelines);
  const isMovingRef = useRef(false);

  // Update ref when guidelines change
  useEffect(() => {
    guidelinesRef.current = guidelines;
  }, [guidelines]);

  // Memoized selection handler
  const handleSelection = useCallback(
    (event: SelectionEvent) => {
      try {
        const selected = event.selected;
        if (selected && selected.length > 0) {
          handleObjectSelection(selected[0]);
        } else {
          clearSettings();
        }
      } catch (error) {
        console.error("Error handling selection:", error);
        clearSettings();
      }
    },
    [handleObjectSelection, clearSettings]
  );

  // Memoized modification handler
  const handleModification = useCallback(
    (target: FabricObject) => {
      try {
        handleObjectSelection(target);
      } catch (error) {
        console.error("Error handling object modification:", error);
      }
    },
    [handleObjectSelection]
  );

  // Handle object movement with snapping
  const handleMoving = useCallback(
    (event: ModifiedEvent<TPointerEvent>) => {
      if (!canvas || !event.target) return;

      if (!isMovingRef.current) {
        isMovingRef.current = true;
        requestAnimationFrame(() => {
          handleObjectMoving(
            canvas,
            event.target,
            guidelinesRef.current,
            setGuidelines
          );
          isMovingRef.current = false;
        });
      }
    },
    [canvas]
  );

  // Handle object modification
  const handleModified = useCallback(() => {
    if (!canvas) return;
    clearGuidelines(canvas, guidelinesRef.current, setGuidelines);
  }, [canvas]);

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    if (!canvas) return;
    clearGuidelines(canvas, guidelinesRef.current, setGuidelines);
  }, [canvas]);

  // Setup canvas events with cleanup
  useEffect(() => {
    if (!canvas) return;

    const debouncedSelection = debounce(handleSelection, 16);
    const debouncedModification = debounce(handleModification, 16);

    // Setup snapping
    canvas.set({
      snapAngle: 45,
      snapThreshold: SNAPPING_CONFIG.snappingDistance,
    });

    // Bind events
    const bindEvents = () => {
      canvas.on("selection:created", debouncedSelection as any);
      canvas.on("selection:updated", debouncedSelection as any);
      canvas.on("selection:cleared", clearSettings);
      canvas.on("object:moving", handleMoving);
      canvas.on("object:modified", (e: ModifiedEvent<TPointerEvent>) => {
        if (e.target) {
          debouncedModification(e.target);
        }
        handleModified();
      });
      canvas.on("mouse:up", handleMouseUp);
      canvas.on("object:scaling", () => canvas.requestRenderAll());
      canvas.on("object:rotating", () => canvas.requestRenderAll());
    };

    // Unbind events
    const unbindEvents = () => {
      canvas.off("selection:created", debouncedSelection as any);
      canvas.off("selection:updated", debouncedSelection as any);
      canvas.off("selection:cleared", clearSettings);
      canvas.off("object:moving", handleMoving);
      canvas.off("object:modified");
      canvas.off("mouse:up", handleMouseUp);
      canvas.off("object:scaling");
      canvas.off("object:rotating");
    };

    // Setup and cleanup
    bindEvents();
    return () => {
      debouncedSelection.cancel();
      debouncedModification.cancel();
      unbindEvents();
      if (canvas) {
        clearGuidelines(canvas, guidelinesRef.current, setGuidelines);
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
    guidelines,
    setGuidelines,
  };
}
