"use client";

import { toFixedNumber } from "@/lib/utils";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";

type Props = {
  symbol: string;
  rateInUsd: number;
};

export default function Converter({ symbol, rateInUsd }: Props) {
  const [usd, setUsd] = useState(rateInUsd);
  const [numOfCoins, setNumOfCoins] = useState(1);

  const handleCoinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setNumOfCoins(value);

    if (!isNaN(value)) {
      const convertedCoinsIntoUsd = value * rateInUsd;
      const fixedDecimalPlacesUsd = toFixedNumber(convertedCoinsIntoUsd, 4);

      setUsd(fixedDecimalPlacesUsd);
    }
  };

  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setUsd(value);

    if (!isNaN(value)) {
      const convertedUsdIntoCoins = value / rateInUsd;
      const fixedDecimalPlacesCoins = toFixedNumber(convertedUsdIntoCoins, 4);
      setNumOfCoins(fixedDecimalPlacesCoins);
    }
  };

  return (
    <Card className="mt-2">
      <CardHeader>
        <CardTitle>{symbol.toUpperCase()} to USD converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border-4 border-secondary rounded-lg p-2">
          <div className="flex justify-between items-center mb-1">
            <p>{symbol.toUpperCase()}</p>
            <Input
              value={numOfCoins}
              onChange={handleCoinsChange}
              min="1"
              type="number"
              className="w-28"
            />
          </div>
          <div className="flex justify-between items-center">
            <p>USD</p>
            <Input
              value={usd}
              onChange={handleUsdChange}
              min="1"
              type="number"
              className="w-28"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
