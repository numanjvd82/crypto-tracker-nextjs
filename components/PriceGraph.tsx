"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { axiosInstanceCoinGecko } from "@/lib/axios";
import { parseAsString, useQueryState } from "nuqs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { H1 } from "./ui/HeadingOne";

const chartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--chart-2))",
  },
  time: {
    label: "Time",
    color: "hsl(var(--chart-1))",
  },
  marketCap: {
    label: "Market Cap",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

type CryptoData = {
  market_caps: unknown[];
  prices: unknown[];
};

type ChartData = {
  time: number;
  price: number;
};

type Props = {
  id: string;
};

export default function PriceGraph({ id }: Props) {
  const [days] = useQueryState("days", parseAsString.withDefault("1"));
  const [chartData, setChartData] = useState<ChartData[] | undefined>();
  const [threshold, setThreshold] = useState<number>(0);

  const tickFormatter = useCallback(
    (value: string) => {
      const date = new Date(value);
      const dateFormatter: { [key: string]: () => string } = {
        // 1 day: Display hours
        "1": () =>
          date.toLocaleString("default", {
            hour: "numeric",
            hour12: true,
          }),

        // 7 days: Display day and time (e.g., "Wed, 1:00 PM")
        "7": () =>
          date.toLocaleString("default", {
            weekday: "short",
            hour: "numeric",
            hour12: true,
          }),

        // 1 month: Display day and month (e.g., "1 Jan")
        "30": () =>
          date.toLocaleString("default", {
            day: "numeric",
            month: "short",
          }),

        // 3 months: Display month and day (e.g., "Jan 1")
        "90": () =>
          date.toLocaleString("default", {
            month: "short",
            day: "numeric",
          }),

        // 6 months: Display month and year (e.g., "Jan 2024")
        "180": () =>
          date.toLocaleString("default", {
            month: "short",
            year: "numeric",
          }),

        // 1 year: Display full date (e.g., "Jan 1, 2024")
        "365": () =>
          date.toLocaleString("default", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
      };
      return days && dateFormatter[days] ? dateFormatter[days]() : "";
    },
    [days]
  );

  useEffect(() => {
    const fetchChartData = async () => {
      if (!id) return;
      try {
        const res = await axiosInstanceCoinGecko.get(
          `/coins/${id}/market_chart`,
          {
            params: {
              vs_currency: "usd",
              days,
            },
          }
        );
        const data = res.data as CryptoData;

        if (data) {
          const transformedData = data.prices.map((d) => {
            const [time, price] = d as [number, number];

            return { time, price };
          });

          const threshold =
            Math.max(...transformedData.map((d) => Math.max(d.price))) / 2;
          setThreshold(threshold);

          setChartData(transformedData);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setChartData(undefined);
        }
      }
    };

    fetchChartData();
  }, [days, id]);

  const Graph = useMemo(() => {
    if (!chartData) {
      return <H1 title="No data " />;
    }

    return (
      <ChartContainer
        config={chartConfig}
        className="mt-4 min-h-[150px] max-h-[400px] w-full min-w-[460px]"
      >
        <AreaChart
          accessibilityLayer
          data={
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            chartData as any[]
          }
        >
          <CartesianGrid vertical={true} />
          <XAxis
            dataKey="time"
            scale="time"
            tickMargin={10}
            axisLine={false}
            tickFormatter={tickFormatter}
            interval="preserveStartEnd"
          />
          <YAxis
            dataKey="price"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            orientation="right"
          />

          <ChartTooltip content={<ChartTooltipContent />} />
          <ReferenceLine y={threshold} stroke="red" strokeDasharray="3 3" />

          <Area dataKey="price" fill="var(--color-price)" radius={4} />
        </AreaChart>
      </ChartContainer>
    );
  }, [chartData, threshold, tickFormatter]);

  return <>{Graph}</>;
}
