import CoinGeckoService from "../services/coingecko/coingecko.service";
import CronService from "../services/cron.service";
import store from "../redux/store";
import { getCoingeckoIdByChainlinkTicker } from "../constants/coingecko";
import {
  addPriceRevertedTx,
  setCurrentOffchainPrice,
  setCurrentOnchainPrice
} from "../redux/prices/prices.redux.actions";
import OracleService from "../services/oracle/oracle.service";
import logger from "../utils/logger.util";
import { RootSocket } from "../index";
import { CONFIG } from "../config";
import EtherscanService from "../services/etherscan/etherscan.service";
import ChainlinkService from "../services/chainlink.service";
import Web3Service from "../services/web3.service";

const coinGecko = new CoinGeckoService();
const etherscan = new EtherscanService();

const oracleService = new OracleService();

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

let lastBlockCache: number = CONFIG.CONTRACTS_DEPLOYMENT_BLOCK;
const fetchPriceUpdatingRevertHistory = async () => {
  logger.log(`Trying to find reverts since block number: ${lastBlockCache}`)

  const currentBlockNumber = await Web3Service.provider.getBlockNumber();
  const revertedTransactions = await etherscan.getRevertedTxHistory(CONFIG.TICKER_PRICE_STORAGE, lastBlockCache);
  lastBlockCache = currentBlockNumber;

  for (let i = 0; i < revertedTransactions.length; i++) {
    const tx = revertedTransactions[i];
    logger.log(`Revert found with tx hash ${tx.hash}`)

    const parsedTxInputs = oracleService.parseInputData(tx.input);
    const chainlinkFeedAddress = store.getState().tickers.chainlinkFeed[parsedTxInputs.ticker];

    // @TODO Handle invalid ticker param sent
    if (!chainlinkFeedAddress) {
      continue;
    }

    const chainlinkFeed = new ChainlinkService(chainlinkFeedAddress);
    const chainlinkPrice = await chainlinkFeed.getPriceForBlock(Number(tx.blockNumber));

    store.dispatch(addPriceRevertedTx(tx.hash, parsedTxInputs.ticker, Number(parsedTxInputs.price), Number(chainlinkPrice)));
  }
}

export const setupPriceUpdateRevertObserverJob = async () => {
  const minutesRefreshRate = 30;
  const runOnInit = true;
  logger.log("Setting up revert history job")

  CronService.scheduleRecurringJob(fetchPriceUpdatingRevertHistory, minutesRefreshRate, runOnInit);
};