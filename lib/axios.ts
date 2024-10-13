import axios from "axios";

const baseURL = "https://pro-api.coinmarketcap.com";

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "X-CMC_PRO_API_KEY": process.env.COINMARKET_API_KEY,
    "Content-Type": "application/json",
    "Accept-Encoding": "deflate, gzip",
  },
});
