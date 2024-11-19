import { useEffect } from "react";
import {
  Object as FabricObject,
  FabricObjectProps,
  ObjectEvents,
  SerializedObjectProps,
  TEvent,
  TPointerEvent,
} from "fabric";
import * as fabric from "fabric";

export function useCanvasEvents(
  canvas: fabric.Canvas | null,
  handleObjectSelection: (obj: FabricObject | null) => void,
  clearSettings: () => void
) {
  useEffect(() => {
    if (!canvas) return;

    const handleSelection = (
      event: Partial<TEvent<TPointerEvent>> & {
        selected: FabricObject<
          Partial<FabricObjectProps>,
          SerializedObjectProps,
          ObjectEvents
        >[];
        deselected?: FabricObject<
          Partial<FabricObjectProps>,
          SerializedObjectProps,
          ObjectEvents
        >[];
      }
    ) => {
      const selected = event.selected;
      if (selected && selected.length > 0) {
        handleObjectSelection(selected[0]);
      } else {
        clearSettings();
      }
    };

    canvas.on(
      "selection:created",
      handleSelection as unknown as (
        event: Partial<TEvent<TPointerEvent>> & {
          selected: FabricObject<
            Partial<FabricObjectProps>,
            SerializedObjectProps,
            ObjectEvents
          >[];
        }
      ) => void
    );
    canvas.on(
      "selection:updated",
      handleSelection as unknown as (
        event: Partial<TEvent<TPointerEvent>> & {
          selected: FabricObject<
            Partial<FabricObjectProps>,
            SerializedObjectProps,
            ObjectEvents
          >[];
          deselected?: FabricObject<
            Partial<FabricObjectProps>,
            SerializedObjectProps,
            ObjectEvents
          >[];
        }
      ) => void
    );
    canvas.on("selection:cleared", clearSettings);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    canvas.on("object:modified", (event: any) =>
      handleObjectSelection(event.target as FabricObject)
    );

    return () => {
      canvas.off(
        "selection:created",
        handleSelection as unknown as (e: TEvent<Event>) => void
      );
      canvas.off(
        "selection:updated",
        handleSelection as unknown as (e: TEvent<Event>) => void
      );
      canvas.off("selection:cleared", clearSettings);
      canvas.off("object:modified");
    };
  }, [canvas, handleObjectSelection, clearSettings]);
}
