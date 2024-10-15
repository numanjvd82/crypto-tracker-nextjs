"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { axiosInstanceCoinGecko } from "@/lib/axios";
import { useEffect, useState } from "react";
import { H1 } from "./ui/HeadingOne";

const chartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--chart-2))",
  },
  time: {
    label: "Time",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type ChartData = {
  time: string;
  price: number;
};

export default function PriceChart() {
  const [chartData, setChartData] = useState<ChartData[] | undefined>();
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await axiosInstanceCoinGecko.get(
          "/coins/ethena/market_chart",
          {
            params: {
              vs_currency: "usd",
              days: 365,
            },
          }
        );
        const data = res.data.prices as unknown[];

        if (data) {
          const transformedData = data.map((d) => {
            const [time, price] = d as [number, number];

            return { time: new Date(time).toLocaleDateString(), price };
          });

          setChartData(transformedData);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setChartData(undefined);
        }
      }
    };

    fetchChartData();
  }, []);

  if (!chartData) {
    return <H1 title="No data " />;
  }

  return (
    <>
      <H1 title="This is a yearly data graph" />

      <ChartContainer
        config={chartConfig}
        className="mt-4 min-h-[150px] w-full min-w-[460px]"
      >
        <AreaChart
          accessibilityLayer
          data={
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            chartData as any[]
          }
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="time"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => {
              const date = new Date(value);
              const time = date.toLocaleString("default", {
                day: "numeric",
                month: "short",
                year: "2-digit",
              });
              return time;
            }}
          />
          <YAxis
            dataKey="price"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />

          <Area dataKey="price" fill="var(--color-price)" radius={4} />
        </AreaChart>
      </ChartContainer>
    </>
  );
}
