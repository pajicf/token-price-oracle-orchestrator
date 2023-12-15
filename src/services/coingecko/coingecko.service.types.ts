import { CoinGeckoFiatCurrencies } from "../../constants/coingecko";
import { DynamicObject } from "../../types/util.types";

export type CoinGeckoSimplePriceResponse = {
  [ticker: string]: DynamicObject<number, CoinGeckoFiatCurrencies>
}

export type CoinGeckoMarketChartRangeResponse = {
  prices: [
    timestamp: number,
    price: number
  ][],
  market_caps: [
    timestamp: number,
    marketCap: number
  ][],
  total_volumes: [
    timestamp: number,
    totalVolume: number
  ][]
}