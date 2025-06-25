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
import { Separator } from "../ui/separator";
import { MarginModeModal } from "./MarginModeModal";
import { LeverageModal } from "./LeverageModal";

export default function ActionsCard() {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [percent, setPercent] = useState(0);
  const [reduceOnly, setReduceOnly] = useState(false);
  const [takeProfit, setTakeProfit] = useState(false);
  const [tpPrice, setTpPrice] = useState("");
  const [tpGain, setTpGain] = useState("");
  const [slPrice, setSlPrice] = useState("");
  const [slLoss, setSlLoss] = useState("");
  const [marginMode, setMarginMode] = useState<"cross" | "isolated">("cross");
  const [modalOpen, setModalOpen] = useState(false);
  const [leverage, setLeverage] = useState(20);
  const [leverageModalOpen, setLeverageModalOpen] = useState(false);

  return (
    <div className="w-full flex flex-col gap-4 overflow-x-hidden">
      <MarginModeModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        value={marginMode}
        onValueChange={setMarginMode}
        onConnect={() => setModalOpen(false)}
      />
      <LeverageModal
        open={leverageModalOpen}
        onOpenChange={setLeverageModalOpen}
        value={leverage}
        onValueChange={setLeverage}
        onConnect={() => setLeverageModalOpen(false)}
      />
      <div className="flex gap-2 mb-2">
        <Button
          variant="outline"
          className="flex-1 bg-background text-foreground border"
          onClick={() => setModalOpen(true)}
        >
          {marginMode === "cross" ? "Cross" : "Isolated"}
        </Button>
        <Button
          variant="outline"
          className="flex-1 bg-background text-foreground border"
          onClick={() => setLeverageModalOpen(true)}
        >
          {leverage}x
        </Button>
      </div>

      <Tabs defaultValue="market" className="w-full">
        <TabsList className="inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger value="market" className="custom-tabs-trigger">
            Market
          </TabsTrigger>
          <TabsTrigger value="limit" className="custom-tabs-trigger">
            Limit
          </TabsTrigger>
        </TabsList>

        <TabsContent value="market" className="px-1">
          <div className="flex flex-col space-y-4">
            <div className="flex gap-2 my-2">
              <Button
                className={`flex-1 ${
                  side === "buy"
                    ? "bg-foreground text-background"
                    : "bg-background text-foreground border"
                }`}
                onClick={() => setSide("buy")}
              >
                Buy / Long
              </Button>
              <Button
                className={`flex-1 ${
                  side === "sell"
                    ? "bg-foreground text-background"
                    : "bg-background text-foreground border"
                }`}
                onClick={() => setSide("sell")}
              >
                Sell / Short
              </Button>
            </div>

            <div className="flex flex-col gap-1 mb-2 mt-4">
              <div className="text-sm flex justify-between">
                <span>Available to Trade</span>
                <span>0.00</span>
              </div>
              <div className="text-sm flex justify-between">
                <span>Current Position</span>
                <span>0.00000 BTC</span>
              </div>
            </div>

            <div className="flex mb-2">
              <Input
                type="text"
                inputMode="decimal"
                pattern="[0-9]*"
                placeholder="Size"
                className="bg-background text-foreground border border-r-0 rounded-r-none appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                style={{ appearance: "textfield" }}
                value={size}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
                    setSize(val);
                  }
                }}
              />
              <Select defaultValue="BTC">
                <SelectTrigger className="bg-background text-foreground border w-24 border-l-0 rounded-l-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background text-foreground border">
                  <SelectItem value="BTC">BTC</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
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
              <div className="relative w-16">
                <Input
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*"
                  value={percent === 0 ? "0" : percent}
                  className="bg-background text-left text-foreground border appearance-none pr-6 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  style={{ appearance: "textfield" }}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
                      let num = val === "" ? 0 : Number(val);
                      if (num < 0) num = 0;
                      if (num > 100) num = 100;
                      setPercent(num);
                    }
                  }}
                />
                <span className="absolute right-3 top-[52%] -translate-y-1/2 text-sm text-foreground pointer-events-none">
                  %
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1 mb-16">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="reduce-only"
                  checked={reduceOnly}
                  onCheckedChange={(v) => setReduceOnly(!!v)}
                />
                <Label htmlFor="reduce-only" className="text-sm">
                  Reduce Only
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="take-profit"
                  checked={takeProfit}
                  onCheckedChange={(v) => setTakeProfit(!!v)}
                />
                <Label htmlFor="take-profit" className="text-sm">
                  Take Profit / Stop Loss
                </Label>
              </div>

              <div className="mt-2 h-[88px] flex flex-col gap-2 w-full">
                {takeProfit ? (
                  <>
                    <div className="flex gap-2 w-full">
                      <Input
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9]*"
                        placeholder="TP Price"
                        value={tpPrice}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
                            setTpPrice(val);
                          }
                        }}
                        className="bg-background text-foreground border focus-visible:border-primary hover:border-primary flex-1 min-w-0"
                      />
                      <Input
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9]*"
                        placeholder="Gain"
                        value={tpGain}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
                            setTpGain(val);
                          }
                        }}
                        className="bg-background text-foreground border focus-visible:border-primary hover:border-primary flex-1 min-w-0"
                      />
                      <div className="w-12 min-w-0">
                        <Select defaultValue="%">
                          <SelectTrigger className="bg-background text-foreground border pr-6 focus-visible:border-primary hover:border-primary w-full min-w-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-background text-foreground border">
                            <SelectItem value="%">%</SelectItem>
                            <SelectItem value="$">$</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full">
                      <Input
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9]*"
                        placeholder="SL Price"
                        value={slPrice}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
                            setSlPrice(val);
                          }
                        }}
                        className="bg-background text-foreground border focus-visible:border-primary hover:border-primary flex-1 min-w-0"
                      />
                      <Input
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9]*"
                        placeholder="Loss"
                        value={slLoss}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
                            setSlLoss(val);
                          }
                        }}
                        className="bg-background text-foreground border focus-visible:border-primary hover:border-primary flex-1 min-w-0"
                      />
                      <div className="w-12 min-w-0">
                        <Select defaultValue="%">
                          <SelectTrigger className="bg-background text-foreground border pr-6 focus-visible:border-primary hover:border-primary w-full min-w-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-background text-foreground border">
                            <SelectItem value="%">%</SelectItem>
                            <SelectItem value="$">$</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="h-full" />
                )}
              </div>
            </div>

            <Button className="w-full bg-foreground text-background font-bold">
              Connect
            </Button>

            <Separator className="mb-4" />

            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="underline-dotted cursor-pointer text-muted-foreground">
                  Liquidation Price
                </span>
                <span>N/A</span>
              </div>
              <div className="flex justify-between">
                <span className="cursor-pointer text-muted-foreground">
                  Order Value
                </span>
                <span>N/A</span>
              </div>
              <div className="flex justify-between">
                <span className="cursor-pointer text-muted-foreground">
                  Margin Required
                </span>
                <span>N/A</span>
              </div>
              <div className="flex justify-between">
                <span className="underline-dotted cursor-pointer text-muted-foreground">
                  Slippage
                </span>
                <span>Est: 0% / Max: 8.00%</span>
              </div>
              <div className="flex justify-between">
                <span className="underline-dotted cursor-pointer text-muted-foreground">
                  Fees
                </span>
                <span>0.0450% / 0.0150%</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="limit" className="px-1">
          <div className="flex flex-col space-y-4">
            <div className="flex gap-2 my-2">
              <Button
                className={`flex-1 ${
                  side === "buy"
                    ? "bg-foreground text-background"
                    : "bg-background text-foreground border"
                }`}
                onClick={() => setSide("buy")}
              >
                Buy / Long
              </Button>
              <Button
                className={`flex-1 ${
                  side === "sell"
                    ? "bg-foreground text-background"
                    : "bg-background text-foreground border"
                }`}
                onClick={() => setSide("sell")}
              >
                Sell / Short
              </Button>
            </div>

            <div className="flex flex-col gap-1 mb-2 mt-4">
              <div className="text-sm flex justify-between">
                <span>Available to Trade</span>
                <span>0.00</span>
              </div>
              <div className="text-sm flex justify-between">
                <span>Current Position</span>
                <span>0.00000 BTC</span>
              </div>
            </div>

            <div className="flex mb-2">
              <Input
                type="text"
                inputMode="decimal"
                pattern="[0-9]*"
                placeholder="Price (USD)"
                className="bg-background text-foreground border appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                style={{ appearance: "textfield" }}
                value={price}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
                    setPrice(val);
                  }
                }}
              />
            </div>

            <div className="flex mb-2">
              <Input
                type="text"
                inputMode="decimal"
                pattern="[0-9]*"
                placeholder="Size"
                className="bg-background text-foreground border border-r-0 rounded-r-none appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                style={{ appearance: "textfield" }}
                value={size}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
                    setSize(val);
                  }
                }}
              />
              <Select defaultValue="BTC">
                <SelectTrigger className="bg-background text-foreground border w-24 border-l-0 rounded-l-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background text-foreground border">
                  <SelectItem value="BTC">BTC</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
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
              <div className="relative w-16">
                <Input
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*"
                  value={percent === 0 ? "0" : percent}
                  className="bg-background text-left text-foreground border appearance-none pr-6 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  style={{ appearance: "textfield" }}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
                      let num = val === "" ? 0 : Number(val);
                      if (num < 0) num = 0;
                      if (num > 100) num = 100;
                      setPercent(num);
                    }
                  }}
                />
                <span className="absolute right-3 top-[52%] -translate-y-1/2 text-sm text-foreground pointer-events-none">
                  %
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1 mb-16">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="reduce-only"
                  checked={reduceOnly}
                  onCheckedChange={(v) => setReduceOnly(!!v)}
                />
                <Label htmlFor="reduce-only" className="text-sm">
                  Reduce Only
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="take-profit"
                  checked={takeProfit}
                  onCheckedChange={(v) => setTakeProfit(!!v)}
                />
                <Label htmlFor="take-profit" className="text-sm">
                  Take Profit / Stop Loss
                </Label>
              </div>

              <div className="mt-2 h-[88px] flex flex-col gap-2 w-full">
                {takeProfit ? (
                  <>
                    <div className="flex gap-2 w-full">
                      <Input
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9]*"
                        placeholder="TP Price"
                        value={tpPrice}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
                            setTpPrice(val);
                          }
                        }}
                        className="bg-background text-foreground border focus-visible:border-primary hover:border-primary flex-1 min-w-0"
                      />
                      <Input
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9]*"
                        placeholder="Gain"
                        value={tpGain}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
                            setTpGain(val);
                          }
                        }}
                        className="bg-background text-foreground border focus-visible:border-primary hover:border-primary flex-1 min-w-0"
                      />
                      <div className="w-12 min-w-0">
                        <Select defaultValue="%">
                          <SelectTrigger className="bg-background text-foreground border pr-6 focus-visible:border-primary hover:border-primary w-full min-w-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-background text-foreground border">
                            <SelectItem value="%">%</SelectItem>
                            <SelectItem value="$">$</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full">
                      <Input
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9]*"
                        placeholder="SL Price"
                        value={slPrice}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
                            setSlPrice(val);
                          }
                        }}
                        className="bg-background text-foreground border focus-visible:border-primary hover:border-primary flex-1 min-w-0"
                      />
                      <Input
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9]*"
                        placeholder="Loss"
                        value={slLoss}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
                            setSlLoss(val);
                          }
                        }}
                        className="bg-background text-foreground border focus-visible:border-primary hover:border-primary flex-1 min-w-0"
                      />
                      <div className="w-12 min-w-0">
                        <Select defaultValue="%">
                          <SelectTrigger className="bg-background text-foreground border pr-6 focus-visible:border-primary hover:border-primary w-full min-w-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-background text-foreground border">
                            <SelectItem value="%">%</SelectItem>
                            <SelectItem value="$">$</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="h-full" />
                )}
              </div>
            </div>

            <Button className="w-full bg-foreground text-background font-bold">
              Connect
            </Button>

            <Separator className="mb-4" />

            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="underline-dotted cursor-pointer text-muted-foreground">
                  Liquidation Price
                </span>
                <span>N/A</span>
              </div>
              <div className="flex justify-between">
                <span className="cursor-pointer text-muted-foreground">
                  Order Value
                </span>
                <span>N/A</span>
              </div>
              <div className="flex justify-between">
                <span className="cursor-pointer text-muted-foreground">
                  Margin Required
                </span>
                <span>N/A</span>
              </div>
              <div className="flex justify-between">
                <span className="underline-dotted cursor-pointer text-muted-foreground">
                  Slippage
                </span>
                <span>Est: 0% / Max: 8.00%</span>
              </div>
              <div className="flex justify-between">
                <span className="underline-dotted cursor-pointer text-muted-foreground">
                  Fees
                </span>
                <span>0.0450% / 0.0150%</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
