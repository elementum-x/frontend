import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";

interface MarginModeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: "cross" | "isolated";
  onValueChange: (value: "cross" | "isolated") => void;
  onConnect: () => void;
}

export function MarginModeModal({
  open,
  onOpenChange,
  value,
  onValueChange,
  onConnect,
}: MarginModeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/20 backdrop-blur-[8px]" />
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>BTC-USD Margin Mode</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-2">
          {/* Cross Option */}
          <button
            type="button"
            className={cn(
              "w-full text-left rounded border p-4 flex gap-3 items-start transition-colors",
              value === "cross"
                ? "border-primary bg-primary/10"
                : "border-muted bg-background hover:border-primary"
            )}
            onClick={() => onValueChange("cross")}
          >
            <Checkbox checked={value === "cross"} className="mt-1" />
            <div>
              <div className="font-semibold">Cross</div>
              <div className="text-xs text-muted-foreground mt-1">
                All cross positions share the same cross margin as collateral.
                In the event of liquidation, your cross margin balance and any
                remaining open positions under assets in this mode may be
                forfeited.
              </div>
            </div>
          </button>
          {/* Isolated Option */}
          <button
            type="button"
            className={cn(
              "w-full text-left rounded border p-4 flex gap-3 items-start transition-colors",
              value === "isolated"
                ? "border-primary bg-primary/10"
                : "border-muted bg-background hover:border-primary"
            )}
            onClick={() => onValueChange("isolated")}
          >
            <Checkbox checked={value === "isolated"} className="mt-1" />
            <div>
              <div className="font-semibold">Isolated</div>
              <div className="text-xs text-muted-foreground mt-1">
                Manage your risk on individual positions by restricting the
                amount of margin allocated to each. If the margin ratio of an
                isolated position reaches 100%, the position will be liquidated.
                Margin can be added or removed to individual positions in this
                mode.
              </div>
            </div>
          </button>
        </div>
        <Button className="w-full mt-4" onClick={onConnect}>
          Connect
        </Button>
      </DialogContent>
    </Dialog>
  );
}
