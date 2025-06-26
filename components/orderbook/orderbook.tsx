import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ExternalLink } from "lucide-react";

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatNumber(num: number) {
  return num.toLocaleString();
}

interface OrderbookRow {
  price: number;
  size: number;
  total: number;
}

// Sell orders: 108500 to 107400, interval -100, descending (12 rows)
const sellPrices = Array.from({ length: 10 }, (_, i) => 108500 - i * 100);
const sellSizes = Array.from({ length: 10 }, () => getRandomInt(10, 500_000));
let sellRunningTotal = 0;
const sellOrders: OrderbookRow[] = sellPrices.map((price, i) => {
  sellRunningTotal += sellSizes[i];
  return {
    price,
    size: sellSizes[i],
    total: sellRunningTotal,
  };
});

// Buy orders: 107600 to 106500, interval -100, descending (12 rows)
const buyPrices = Array.from({ length: 12 }, (_, i) => 107600 - i * 100);
const buySizes = Array.from({ length: 12 }, () => getRandomInt(10, 500_000));
let buyRunningTotal = 0;
const buyOrders: OrderbookRow[] = buyPrices.map((price, i) => {
  buyRunningTotal += buySizes[i];
  return {
    price,
    size: buySizes[i],
    total: buyRunningTotal,
  };
});

// Mock trades data
interface TradeRow {
  price: number;
  size: number;
  time: string;
  color: string;
}

function getRandomTime() {
  const now = new Date();
  const minutesAgo = getRandomInt(0, 59);
  const secondsAgo = getRandomInt(0, 59);
  const date = new Date(now.getTime() - (minutesAgo * 60 + secondsAgo) * 1000);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// Generate enough trades to fill the card (e.g., 23 rows, adjust as needed for your card size)
const tradeRows: TradeRow[] = Array.from({ length: 23 }, () => ({
  price: getRandomInt(106500, 108500),
  size: Number((Math.random() * 2).toFixed(5)),
  time: getRandomTime(),
  color: Math.random() > 0.5 ? "green" : "red",
}));

export default function OrderBook() {
  // Calculate buy/sell sizes and percentages
  const sellSize = sellOrders.reduce((sum, row) => sum + row.size, 0);
  const buySize = buyOrders.reduce((sum, row) => sum + row.size, 0);
  const totalSize = buySize + sellSize;
  const buyPercent = totalSize ? (buySize / totalSize) * 100 : 0;
  const sellPercent = totalSize ? (sellSize / totalSize) * 100 : 0;

  return (
    <Tabs defaultValue="orderbook" className="w-full">
      <TabsList className="inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0">
        <TabsTrigger value="orderbook" className="custom-tabs-trigger">
          Order Book
        </TabsTrigger>
        <TabsTrigger value="trades" className="custom-tabs-trigger">
          Trades
        </TabsTrigger>
      </TabsList>
      <TabsContent value="orderbook">
        <Table>
          <TableHeader>
            <TableRow className="border-none p-0">
              <TableHead className="text-left text-muted-foreground p-1">
                Price
              </TableHead>
              <TableHead className="text-right text-muted-foreground p-1">
                Size (USD)
              </TableHead>
              <TableHead className="text-right text-muted-foreground p-1">
                Total (USD)
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sellOrders.map((order) => (
              <TableRow key={order.price} className="border-none p-0">
                <TableCell className="text-left text-red-400 font-medium p-1">
                  {formatNumber(order.price)}
                </TableCell>
                <TableCell className="text-right p-1">
                  {formatNumber(order.size)}
                </TableCell>
                <TableCell className="text-right p-1">
                  {formatNumber(order.total)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {/* Horizontal bar for buy/sell percentage */}
          <tr>
            <td colSpan={3}>
              <div className="w-full relative flex items-center my-2 h-5 rounded overflow-hidden">
                <div
                  className="h-full bg-green-400/40 flex items-center justify-center relative"
                  style={{
                    width: `${buyPercent}%`,
                    borderTopLeftRadius: 4,
                    borderBottomLeftRadius: 4,
                  }}
                  title={`Buy: ${buyPercent.toFixed(1)}%`}
                >
                  {buyPercent > 8 && (
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white">
                      {buyPercent.toFixed(1)}%
                    </span>
                  )}
                </div>
                <div
                  className="h-full bg-red-400/40 flex items-center justify-center relative"
                  style={{
                    width: `${sellPercent}%`,
                    borderTopRightRadius: 4,
                    borderBottomRightRadius: 4,
                  }}
                  title={`Sell: ${sellPercent.toFixed(1)}%`}
                >
                  {sellPercent > 8 && (
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white">
                      {sellPercent.toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
            </td>
          </tr>

          <TableBody>
            {buyOrders.map((order) => (
              <TableRow key={order.price} className="border-none p-0">
                <TableCell className="text-left text-green-400 font-medium p-1">
                  {formatNumber(order.price)}
                </TableCell>
                <TableCell className="text-right p-1">
                  {formatNumber(order.size)}
                </TableCell>
                <TableCell className="text-right p-1">
                  {formatNumber(order.total)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
      <TabsContent value="trades">
        <Table>
          <TableHeader>
            <TableRow className="border-none p-0">
              <TableHead className="text-left text-muted-foreground p-1">
                Price
              </TableHead>
              <TableHead className="text-right text-muted-foreground p-1">
                Size (BTC)
              </TableHead>
              <TableHead className="text-right text-muted-foreground p-1">
                Time
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tradeRows.map((trade, i) => (
              <TableRow key={i} className="border-none p-0">
                <TableCell
                  className={`text-left font-medium p-1 ${
                    trade.color === "green" ? "text-green-400" : "text-red-400"
                  } `}
                >
                  {formatNumber(trade.price)}
                </TableCell>
                <TableCell className="text-right p-1">{trade.size}</TableCell>
                <TableCell className="text-right p-1 flex items-center justify-end gap-1">
                  {trade.time}
                  <ExternalLink className="w-4 h-4 text-muted-foreground cursor-pointer" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  );
}
