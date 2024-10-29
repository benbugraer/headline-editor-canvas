import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface ToolbarButtonProps {
  label: string;
  icon: React.ElementType;
  onClick: () => void;
}

export function ToolbarButton({
  label,
  icon: Icon,
  onClick,
}: ToolbarButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 hover:bg-primary hover:text-white"
          onClick={onClick}
        >
          <Icon className="h-5 w-5" />
          <span>{label}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>Add {label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
