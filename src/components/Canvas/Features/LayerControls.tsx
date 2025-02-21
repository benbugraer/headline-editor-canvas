import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LAYER_ACTIONS, ALIGN_ACTIONS } from "../utils/constants";

interface LayerControlsProps {
  onLayerChange: (action: "up" | "down" | "top" | "bottom") => void;
  onAlignChange: (
    align: "left" | "center" | "right" | "top" | "middle" | "bottom"
  ) => void;
}

const LayerButton = ({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ElementType;
  label?: string;
  onClick: () => void;
}) => (
  <Button
    variant="secondary"
    size="sm"
    onClick={onClick}
    className="flex items-center gap-2"
  >
    <Icon className="h-4 w-4" />
    {label}
  </Button>
);

export function LayerControls({
  onLayerChange,
  onAlignChange,
}: LayerControlsProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          Layers
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" sideOffset={5}>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Katmanlar</h4>
            <div className="grid grid-cols-2 gap-2">
              {LAYER_ACTIONS.map(({ action, icon, label }) => (
                <LayerButton
                  key={action}
                  icon={icon}
                  label={label}
                  onClick={() => {
                    onLayerChange(action);
                    requestAnimationFrame(() => {
                      document.dispatchEvent(new Event("layerChanged"));
                    });
                  }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium leading-none">Pozisyon</h4>
            <div className="grid grid-cols-3 gap-2">
              {ALIGN_ACTIONS.map(({ align, icon }) => (
                <LayerButton
                  key={align}
                  icon={icon}
                  onClick={() => {
                    onAlignChange(align);
                    requestAnimationFrame(() => {
                      document.dispatchEvent(new Event("layerChanged"));
                    });
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
