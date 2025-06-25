import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function OverviewCard() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 bg-background text-foreground border"
        >
          Deposit
        </Button>
        <Button
          variant="outline"
          className="flex-1 bg-background text-foreground border"
        >
          Withdraw
        </Button>
      </div>

      <Separator />

      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-regular">Account Equity</h2>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Spot</span>
            <span className="font-semibold">$0.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="underline-dotted cursor-pointer text-muted-foreground">
              Perps
            </span>
            <span className="font-semibold">$0.00</span>
          </div>
        </div>
      </div>

      <h2 className="text-sm font-regular">Perps Overview</h2>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="underline-dotted cursor-pointer text-muted-foreground">
            Balance
          </span>
          <span className="font-semibold">$0.00</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Unrealized PNL</span>
          <span className="font-semibold">$0.00</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="underline-dotted cursor-pointer text-muted-foreground">
            Cross Margin Ratio
          </span>
          <span className="font-semibold text-green-500">0.00%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="underline-dotted cursor-pointer text-muted-foreground">
            Maintenance Margin
          </span>
          <span className="font-semibold">$0.00</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="underline-dotted cursor-pointer text-muted-foreground">
            Cross Account Leverage
          </span>
          <span className="font-semibold">0.00x</span>
        </div>
      </div>
    </div>
  );
}
