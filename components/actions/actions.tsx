import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { useState } from "react";

export default function ActionsCard() {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [size, setSize] = useState(0);
  const [percent, setPercent] = useState(0);
  const [reduceOnly, setReduceOnly] = useState(false);
  const [takeProfit, setTakeProfit] = useState(false);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex gap-2 mb-2">
        <Button
          variant="outline"
          className="flex-1 bg-background text-foreground border"
        >
          Cross
        </Button>
        <Button
          variant="outline"
          className="flex-1 bg-background text-foreground border"
        >
          20x
        </Button>
        <Button
          variant="outline"
          className="flex-1 bg-background text-foreground border"
        >
          One-Way
        </Button>
      </div>
      <Tabs defaultValue="market" className="w-full">
        <TabsList className="w-full bg-background border-b border">
          <TabsTrigger value="market" className="text-foreground">
            Market
          </TabsTrigger>
          <TabsTrigger value="limit" className="text-foreground">
            Limit
          </TabsTrigger>
        </TabsList>
        <TabsContent value="market">
          <div className="flex gap-2 my-2">
            <Button
              className={`flex-1 ${
                side === "buy"
                  ? "bg-foreground text-background"
                  : "bg-background text-foreground border border"
              }`}
              onClick={() => setSide("buy")}
            >
              Buy / Long
            </Button>
            <Button
              className={`flex-1 ${
                side === "sell"
                  ? "bg-foreground text-background"
                  : "bg-background text-foreground border border"
              }`}
              onClick={() => setSide("sell")}
            >
              Sell / Short
            </Button>
          </div>
          <div className="text-xs flex justify-between mb-1">
            <span>Available to Trade</span>
            <span>0.00</span>
          </div>
          <div className="text-xs flex justify-between mb-1">
            <span>Current Position</span>
            <span>0.00000 BTC</span>
          </div>
          <div className="flex gap-2 mb-2">
            <Input
              type="number"
              placeholder="Size"
              className="bg-background text-foreground border"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
            />
            <Select defaultValue="BTC">
              <SelectTrigger className="bg-background text-foreground border w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background text-foreground border">
                <SelectItem value="BTC">BTC</SelectItem>
                <SelectItem value="ETH">ETH</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Slider
              min={0}
              max={100}
              step={1}
              value={[percent]}
              onValueChange={([v]) => setPercent(v)}
              className="flex-1"
            />
            <Input
              type="number"
              min={0}
              max={100}
              value={percent}
              onChange={(e) => setPercent(Number(e.target.value))}
              className="w-16 bg-background text-foreground border text-right"
            />
            <span className="text-xs">%</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Checkbox
              id="reduce-only"
              checked={reduceOnly}
              onCheckedChange={(v) => setReduceOnly(!!v)}
            />
            <Label htmlFor="reduce-only" className="text-xs">
              Reduce Only
            </Label>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Checkbox
              id="take-profit"
              checked={takeProfit}
              onCheckedChange={(v) => setTakeProfit(!!v)}
            />
            <Label htmlFor="take-profit" className="text-xs">
              Take Profit / Stop Loss
            </Label>
          </div>
          <Button className="w-full bg-foreground text-background font-bold">
            Enable Trading
          </Button>
          <div className="text-xs mt-2 space-y-1">
            <div className="flex justify-between">
              <span className="underline">Liquidation Price</span>
              <span>N/A</span>
            </div>
            <div className="flex justify-between">
              <span>Order Value</span>
              <span>N/A</span>
            </div>
            <div className="flex justify-between">
              <span>Margin Required</span>
              <span>N/A</span>
            </div>
            <div className="flex justify-between">
              <span className="underline">Slippage</span>
              <span>Est: 0% / Max: 8.00%</span>
            </div>
            <div className="flex justify-between">
              <span>Fees</span>
              <span>0.0450% / 0.0150%</span>
            </div>
          </div>
        </TabsContent>
        {/* Limit tab can be implemented similarly */}
      </Tabs>
    </div>
  );
}
