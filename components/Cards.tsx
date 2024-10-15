export const revalidate = 60;

import { axiosInstance } from "@/lib/axios";
import { CoinDetails } from "@/lib/types";
import PriceChart from "./PriceChart";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { H1 } from "./ui/HeadingOne";
import { MutedText } from "./ui/MutedText";
import { SmallText } from "./ui/SmallText";

export default async function Cards() {
  const res = await axiosInstance.get(
    "/v1/cryptocurrency/quotes/latest?symbol=ETH"
  );
  const {
    name,
    quote,
    total_supply,
    max_supply,
    circulating_supply,
    date_added,
    cmc_rank,
    platform,
  } = (await res.data.data.ETH) as CoinDetails;
  const priceChange = quote.USD.percent_change_24h ?? 0;
  const isPositive = priceChange > 0;
  return (
    <>
      <div className="grid md:grid-cols-2 gap-3">
        <Card className="mt-2">
          <CardHeader className="flex-row justify-between items-center">
            <CardTitle>
              <H1 className="text-4xl" title={name || ""} />
            </CardTitle>
            <div className="flex justify-center">
              <H1 title={`$${quote?.USD?.price.toLocaleString()}` || "N/A"} />
              <div
                className={`ml-2 flex items-center ${
                  isPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                {isPositive ? "\u25B2" : "\u25BC"}
                <SmallText title={`${priceChange.toFixed(2)}%`} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div>
              <MutedText title="Market Cap" />
              <SmallText title={"$" + quote.USD.market_cap.toLocaleString()} />
            </div>
            <div>
              <MutedText title="Fully Diluted Market Cap" />
              <SmallText
                title={
                  "$" + quote.USD.fully_diluted_market_cap.toLocaleString()
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-2">
          <CardHeader className="flex-row justify-between items-center">
            <CardTitle>
              <H1 className="text-4xl" title="CMC Rank" />
            </CardTitle>
            <H1 title={"#" + cmc_rank} />
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div>
              <MutedText title="Total Supply" />
              <SmallText title={total_supply.toLocaleString()} />
            </div>
            <div>
              <MutedText title="Max Supply" />
              <SmallText title={max_supply?.toLocaleString() || "N/A"} />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-2">
          <CardHeader className="flex-row justify-between items-center">
            <CardTitle>
              <H1 className="text-4xl" title="Date Added" />
            </CardTitle>
            <H1 title={new Date(date_added).toLocaleDateString()} />
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div>
              <MutedText title="Circulated Supply" />
              <SmallText title={circulating_supply.toLocaleString()} />
            </div>
            <div>
              <MutedText title="Platform" />
              <SmallText title={platform?.name || "N/A"} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <PriceChart />
      </Card>
    </>
  );
}
