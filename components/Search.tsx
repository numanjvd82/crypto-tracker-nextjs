import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { axiosInstanceCoinGecko } from "@/lib/axios";
import { Coin } from "@/lib/types";
import { DialogTitle } from "@radix-ui/react-dialog";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "./ui/input";
import { MutedText } from "./ui/MutedText";

export default function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 1000);
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const searchCoin = async () => {
      if (!debouncedQuery) return;

      try {
        const res = await axiosInstanceCoinGecko.get(
          `/search?query=${debouncedQuery}`
        );

        const coins = res.data.coins;

        setCoins(coins);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(`"Error fetching coin data" ${err.message}`);
        }
      }
    };

    searchCoin();
  }, [debouncedQuery]);

  const CoinsList = () => {
    if (coins.length === 0 || !coins) {
      return (
        <MutedText className="text-lg text-center" title="No coin found!" />
      );
    }
    return (
      <>
        {coins.map(({ id, market_cap_rank, name, large }, i) => (
          <Link
            href={`/${id}`}
            onClick={() => setOpen(false)}
            className="
        cursor-pointer hover:bg-secondary transition-all hover:-translate-y-1
      "
            key={id}
          >
            <div className="flex justify-between items-center my-1 p-2">
              <div className="flex items-center gap-3">
                <MutedText title={`#${i + 1}`} />
                <Image src={large} width={25} height={25} alt="Coin Image" />
                <p className="leading-7">{name}</p>
              </div>
              <div>
                <MutedText title="Market Cap Rank" />
                <p>{market_cap_rank}</p>
              </div>
            </div>
          </Link>
        ))}
      </>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <SearchIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby="Modal for searching coins"
        className="sm:max-w-[600px] max-h-[425px] overflow-auto"
      >
        <DialogHeader>
          <DialogTitle>Search for coins</DialogTitle>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type...."
          />
        </DialogHeader>
        <div>{CoinsList()}</div>
      </DialogContent>
    </Dialog>
  );
}
