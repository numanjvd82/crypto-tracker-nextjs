import { axiosInstanceCoinGecko } from "./axios";
import { CoinDetails } from "./types";

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
