import CoinGeckoService from "../services/coingecko/coingecko.service";
import CronService from "../services/cron.service";
import store from "../redux/store";
import { getCoingeckoIdByChainlinkTicker } from "../constants/coingecko";
import { setCurrentOffchainPrice, setCurrentOnchainPrice } from "../redux/prices/prices.redux.actions";
import OracleService from "../services/oracle/oracle.service";
import logger from "../utils/logger.util";
import { RootSocket } from "../index";
import Web3Service from "../services/web3.service";
import { CONFIG } from "../config";

const coinGecko = new CoinGeckoService();
const oracleService = new OracleService();
const registryContract = Web3Service.getTickerUSDFeedRegistryContract(CONFIG.TICKER_USD_FEED_REGISTRY);

export const setupOffchainPriceFetchingJob = async () => {
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
      try {
        await oracleService.updateOnchainPrice(symbol, currentPrice);
      } catch (err) { console.log(err);}
    }
  });
};

const updateReduxTickerOnchainPrice = (tickerSymbol: string, tickerPrice: number) => {
  store.dispatch(setCurrentOnchainPrice(tickerSymbol, tickerPrice));
};

export const initOnchainPriceState = async (symbols: string[]) => {
  for (let i = 0; i < symbols.length; i++) {
    const tickerSymbol = symbols[i];
    const newPrice = await oracleService.getOnchainPrice(tickerSymbol);
    updateReduxTickerOnchainPrice(tickerSymbol, newPrice);
  }
};

const isJobActive: Map<string, boolean> = new Map();
export const setupOnchainPriceFetchingJobFor = async (tickerSymbol: string) => {
  if (isJobActive.get(tickerSymbol)) {
    return;
  } else {
    isJobActive.set(tickerSymbol, true);
  }

  logger.log("Setting up the onchain Price fetching observer for ", tickerSymbol);
  await oracleService.listenForOnchainPriceUpdates(tickerSymbol, (tickerPriceData) => {
    updateReduxTickerOnchainPrice(tickerSymbol, tickerPriceData.newPrice);
    RootSocket.emitEvent("TickerPriceUpdated", [tickerSymbol, tickerPriceData.newPrice]);
  });
};

export const setupPriceUpdateRevertObserverJob = async () => {
};