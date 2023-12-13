import CoinGeckoService from "../services/coingecko/coingecko.service";
import CronService from "../services/cron.service";
import store from "../redux/store";
import {getCoingeckoIdByChainlinkTicker} from "../constants/coingecko";
import {setCurrentOffchainPrice} from "../redux/prices/prices.redux.actions";

export const setupOffchainPriceFetchingJob = async () => {
  const coinGecko = new CoinGeckoService();

  CronService.scheduleRecurringJob(async () => {
    const tickerSymbols = store.getState().tickers.symbols;
    const tickerCoinGeckoIds = tickerSymbols.map(getCoingeckoIdByChainlinkTicker);

    const offchainPrices = await coinGecko.getPrices(tickerCoinGeckoIds);
    tickerCoinGeckoIds.forEach((id, index) => {
      const symbol = tickerSymbols[index];
      const currentPrice = offchainPrices[id]?.usd;

      if (currentPrice) {
        store.dispatch(setCurrentOffchainPrice(symbol, currentPrice));
      }
    })
  })
}