import { axiosInstanceCoinGecko } from "./axios";
import { CoinDetails, CoinList } from "./types";

export const fetchAllCoinsId = async () => {
  try {
    const res = await axiosInstanceCoinGecko.get("/coins/list");
    return res.data as CoinList[];
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err);
    }
  }
};

export const fetchCoinDataById = async (id: string) => {
  if (!id) return;
  try {
    const res = await axiosInstanceCoinGecko.get(`/coins/${id}`);
    const coinsData = res.data as CoinDetails;
    return coinsData;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err);
    }
  }
};
