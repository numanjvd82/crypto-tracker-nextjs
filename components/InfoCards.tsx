export const revalidate = 60;

import { axiosInstanceCoinGecko } from "@/lib/axios";
import { CoinDetails } from "@/lib/types";
import Link from "next/link";
import Converter from "./Converter";
import { PlusMinusIndicator } from "./PlusMinusIndicator";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { H1 } from "./ui/HeadingOne";
import { MutedText } from "./ui/MutedText";
import { SmallText } from "./ui/SmallText";

type Props = {
  id: string;
};

export default async function InfoCards({ id }: Props) {
  if (!id) return;
  const res = await axiosInstanceCoinGecko.get(`/coins/${id}`);
  const { name, symbol, genesis_date, market_cap_rank, market_data, links } =
    (await res.data) as CoinDetails;
  const priceChange = market_data.price_change_percentage_24h ?? 0;
  const isPositive = priceChange > 0;
  return (
    <div className="grid md:grid-cols-2 gap-3">
      <Card className="mt-2">
        <CardHeader className="flex-row justify-between items-center">
          <CardTitle>
            <H1 className="text-4xl" title={name} />
          </CardTitle>
          <div className="flex justify-center">
            <H1
              title={
                `$${market_data.current_price.usd.toLocaleString()}` || "N/A"
              }
            />
            <PlusMinusIndicator
              changeValue={priceChange}
              isPositive={isPositive}
            />
          </div>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div>
            <MutedText title="Market Cap" />
            <SmallText
              title={"$" + market_data.market_cap?.usd.toLocaleString()}
            />
          </div>
          <div>
            <MutedText title="Fully Diluted Valuation" />
            <SmallText
              title={
                "$" + market_data.fully_diluted_valuation?.usd.toLocaleString()
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mt-2">
        <CardHeader className="flex-row justify-between items-center">
          <CardTitle>
            <H1 className="text-4xl" title="Market Cap Rank" />
          </CardTitle>
          <H1 title={"#" + market_cap_rank} />
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div>
            <MutedText title="Total Supply" />
            <SmallText title={market_data.total_supply?.toLocaleString()} />
          </div>
          <div>
            <MutedText title="Max Supply" />
            <SmallText
              title={market_data.max_supply?.toLocaleString() || "N/A"}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mt-2">
        <CardHeader className="flex-row justify-between items-center">
          <CardTitle>
            <H1 className="text-2xl" title="Date Added" />
          </CardTitle>
          <H1
            className="text-2xl"
            title={new Date(genesis_date).toLocaleDateString()}
          />
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div>
            <MutedText title="Circulated Supply" />
            <SmallText
              title={market_data.circulating_supply?.toLocaleString()}
            />
          </div>
          <div>
            <Link target="_blank" href={links.whitepaper || ""}>
              <MutedText title="Whitepaper" />
            </Link>
          </div>
        </CardContent>
      </Card>

      <Converter symbol={symbol} rateInUsd={market_data.current_price.usd} />
    </div>
  );
}
