"use client";

import { Chart } from "@/components/chart/chart";
import { useTheme } from "next-themes";
import ActionsCard from "@/components/actions/actions";
import OverviewCard from "@/components/overview/overview";
import OrderBook from "@/components/orderbook/orderbook";

const initialData = [
  { time: "2018-12-22", open: 32.51, high: 33.51, low: 32.0, close: 32.51 },
  { time: "2018-12-23", open: 32.51, high: 34.11, low: 31.11, close: 31.11 },
  { time: "2018-12-24", open: 31.11, high: 32.02, low: 27.02, close: 27.02 },
  { time: "2018-12-25", open: 27.02, high: 28.32, low: 27.02, close: 27.32 },
  { time: "2018-12-26", open: 27.32, high: 27.32, low: 25.17, close: 25.17 },
  { time: "2018-12-27", open: 25.17, high: 29.89, low: 25.17, close: 28.89 },
  { time: "2018-12-28", open: 28.89, high: 28.89, low: 25.46, close: 25.46 },
  { time: "2018-12-29", open: 25.46, high: 25.46, low: 23.92, close: 23.92 },
  { time: "2018-12-30", open: 23.92, high: 23.92, low: 22.68, close: 22.68 },
  { time: "2018-12-31", open: 22.68, high: 23.67, low: 22.67, close: 22.67 },
];

export default function Home() {
  const { resolvedTheme } = useTheme();

  const isDarkMode = resolvedTheme === "dark";

  const chartColors = isDarkMode
    ? {
        backgroundColor: "black",
        lineColor: "#26a69a",
        textColor: "white",
        areaTopColor: "#26a69a",
        areaBottomColor: "rgba(38, 166, 154, 0.28)",
      }
    : {
        backgroundColor: "white",
        lineColor: "#26a69a",
        textColor: "black",
        areaTopColor: "#26a69a",
        areaBottomColor: "rgba(38, 166, 154, 0.28)",
      };

  return (
    <main className="flex min-h-screen flex-col justify-between p-1">
      <div className="flex flex-col w-full justify-between items-start gap-1">
        <div className="w-full flex gap-1">
          <div className="w-[80%] flex gap-1">
            <div className="w-[75%] flex flex-col gap-1">
              <div className="border rounded-md p-2">
                <div className="w-full h-full">chart info</div>
              </div>
              <div className="border rounded-md p-2 flex-1">
                <Chart data={initialData} colors={chartColors}></Chart>
              </div>
            </div>
            <div className="w-[25%] border rounded-md p-2">
              <OrderBook />
            </div>
          </div>

          <div className="w-[20%] border rounded-md p-2">
            <ActionsCard />
          </div>
        </div>

        <div className="w-full flex gap-1">
          <div className="w-[80%] flex gap-1">
            <div className="border rounded-md p-2 grow">
              <div className="w-full h-full">open positions info</div>
            </div>
          </div>

          <div className="w-[20%] border rounded-md p-2">
            <OverviewCard />
          </div>
        </div>
      </div>
    </main>
  );
}
