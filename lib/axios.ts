import axios from "axios";

const coinMarketCapBaseUrl = "https://pro-api.coinmarketcap.com";

export const axiosInstance = axios.create({
  baseURL: coinMarketCapBaseUrl,
  headers: {
    "X-CMC_PRO_API_KEY": process.env.COINMARKET_API_KEY,
    "Content-Type": "application/json",
    "Accept-Encoding": "deflate, gzip",
  },
});

const coinGeckoBaseUrl = "https://api.coingecko.com/api/v3";
export const axiosInstanceCoinGecko = axios.create({
  baseURL: coinGeckoBaseUrl,
  headers: {
    Accept: "application/json",
    "x-cg-demo-api-key": process.env.COINGECKO_API_KEY,
  },
});
