import CoinGeckoService from "../services/coingecko/coingecko.service";
import CronService from "../services/cron.service";
import store from "../redux/store";
import {getCoingeckoIdByChainlinkTicker} from "../constants/coingecko";

export const setupOffchainPriceFetchingJob = async () => {
  const coinGecko = new CoinGeckoService();

  CronService.scheduleRecurringJob(async () => {
    const tickerSymbols = store.getState().tickers.symbols;
    const tickerCoinGeckoIds = tickerSymbols.map(getCoingeckoIdByChainlinkTicker);

    const offchainPrices = await coinGecko.getPrices(tickerCoinGeckoIds);

  })
}