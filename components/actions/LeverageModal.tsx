import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

interface LeverageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: number;
  onValueChange: (value: number) => void;
  onConnect: () => void;
}

export function LeverageModal({
  open,
  onOpenChange,
  value,
  onValueChange,
  onConnect,
}: LeverageModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/40 backdrop-blur-[8px]" />
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-center">Adjust Leverage</DialogTitle>
        </DialogHeader>
        <div className="text-center text-sm text-muted-foreground mt-2">
          Control the leverage used for BTC positions. The maximum leverage is
          40x.
          <br />
          <span className="block mt-2">
            Max position size decreases the higher your leverage.
          </span>
        </div>
        <div className="flex items-center gap-2 mt-6 mb-4">
          <Slider
            min={1}
            max={40}
            step={1}
            value={[value]}
            onValueChange={([v]) => onValueChange(v)}
            className="flex-1"
          />
          <div className="flex items-center gap-1 bg-background rounded px-3 py-1 ml-2 min-w-[56px] justify-center">
            <Input
              type="number"
              min={1}
              max={40}
              value={value}
              onChange={(e) => {
                let v = Number(e.target.value);
                if (isNaN(v)) v = 1;
                v = Math.max(1, Math.min(40, v));
                onValueChange(v);
              }}
              className="font-semibold text-lg w-10 text-center border-none focus:ring-0 focus:outline-none p-0 m-0 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              style={{ boxShadow: "none" }}
            />
            <span className="text-muted-foreground">x</span>
          </div>
        </div>
        <Button className="w-full mt-2 mb-4" onClick={onConnect}>
          Connect
        </Button>
        <div className="w-full border border-destructive/60 bg-destructive/10 text-destructive rounded px-4 py-2 text-center text-sm">
          Note that setting a higher leverage increases the risk of liquidation.
        </div>
      </DialogContent>
    </Dialog>
  );
}
