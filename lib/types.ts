export type CoinDetails = {
  id: number;
  name: string;
  symbol: string;
  market_data: {
    current_price: {
      usd: number;
    };
    max_supply: number | null;
    circulating_supply: number;
    total_supply: number;
    price_change_percentage_24h: number;
    fully_diluted_valuation: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
  };
  genesis_date: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  links: {
    homepage: string[];
    whitepaper: string;
  };
  market_cap_rank: number;
};

export type Coin = {
  id: string;
  name: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
  symbol: string;
};
