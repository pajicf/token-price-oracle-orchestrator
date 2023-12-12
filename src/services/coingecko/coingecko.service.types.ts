import { CoinGeckoFiatCurrencies } from "../../constants/coingecko";
import { DynamicObject } from "../../types/util.types";

export type CoinGeckoSimplePriceResponse = {
  [ticker: string]: DynamicObject<number, CoinGeckoFiatCurrencies>
}