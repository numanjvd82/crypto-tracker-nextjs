"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { parseAsString, useQueryState } from "nuqs";

export default function GraphTabs() {
  const [days, setDays] = useQueryState("days", parseAsString.withDefault("1"));
  return (
    <div className="mt-2 mr-6 flex justify-end">
      <Tabs defaultValue={days} onValueChange={(value) => setDays(value)}>
        <TabsList>
          <TabsTrigger value="1">1D</TabsTrigger>
          <TabsTrigger value="7">7D</TabsTrigger>
          <TabsTrigger value="30">1M</TabsTrigger>
          <TabsTrigger value="90">3M</TabsTrigger>
          <TabsTrigger value="180">6M</TabsTrigger>
          <TabsTrigger value="365">1Y</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
