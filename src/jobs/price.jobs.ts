import CoinGeckoService from "../services/coingecko/coingecko.service";
import CronService from "../services/cron.service";
import store from "../redux/store";
import { getCoingeckoIdByChainlinkTicker } from "../constants/coingecko";
import { setCurrentOffchainPrice } from "../redux/prices/prices.redux.actions";
import OracleService from "../services/oracle/oracle.service";

export const setupOffchainPriceFetchingJob = async () => {
  const coinGecko = new CoinGeckoService();
  const oracleService = new OracleService();

  CronService.scheduleRecurringJob(async () => {
    const tickerSymbols = store.getState().tickers.symbols;
    const tickerCoinGeckoIds = tickerSymbols.map(getCoingeckoIdByChainlinkTicker);

    const offchainPrices = await coinGecko.getPrices(tickerCoinGeckoIds);
    for (let index = 0; index < tickerSymbols.length; index++) {
      const id = tickerCoinGeckoIds[index];
      const symbol = tickerSymbols[index];
      const currentPrice = offchainPrices[id]?.usd;

      if (currentPrice) {
        store.dispatch(setCurrentOffchainPrice(symbol, currentPrice));
      }

      console.log(`Updating price of ${symbol} to ${currentPrice}`);
      try {
        await oracleService.updateOnchainPrice(symbol, currentPrice);
      } catch (err) { console.log(err);}
    }
  });
};