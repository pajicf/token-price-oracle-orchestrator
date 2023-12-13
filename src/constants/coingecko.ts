export enum CoinGeckoFiatCurrencies {
  USD = "usd"
}

const chainlinkTickerToCoingeckoMap: {[symbol: string]: string} = {
  "BTC": "bitcoin",
  "ETH": "ethereum",
  "LINK": "chainlink",
  "SNX": "havven"
}

export function getCoingeckoIdByChainlinkTicker(ticker: string) {
  return chainlinkTickerToCoingeckoMap[ticker];
}