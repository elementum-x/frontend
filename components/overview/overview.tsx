import { Button } from "../ui/button";

export default function OverviewCard() {
  return (
    <div className="w-full flex flex-col gap-4">
      <Button className="w-full bg-foreground text-background font-bold">
        Deposit
      </Button>
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 bg-background text-foreground border"
        >
          Perps ↔ Spot
        </Button>
        <Button
          variant="outline"
          className="flex-1 bg-background text-foreground border"
        >
          Withdraw
        </Button>
      </div>
      <div className="border-b border" />
      <div className="text-sm font-semibold">Account Equity</div>
      <div className="flex justify-between text-xs">
        <span>Spot</span>
        <span>$0.00</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="underline cursor-pointer">Perps</span>
        <span>$0.00</span>
      </div>
      <div className="text-sm font-semibold">Perps Overview</div>
      <div className="flex justify-between text-xs">
        <span className="underline cursor-pointer">Balance</span>
        <span>$0.00</span>
      </div>
      <div className="flex justify-between text-xs">
        <span>Unrealized PNL</span>
        <span>$0.00</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="underline cursor-pointer">Cross Margin Ratio</span>
        <span className="text-green-500">0.00%</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="underline cursor-pointer">Maintenance Margin</span>
        <span>$0.00</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="underline cursor-pointer">Cross Account Leverage</span>
        <span>0.00x</span>
      </div>
    </div>
  );
}
