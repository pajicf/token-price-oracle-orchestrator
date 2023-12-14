import { initTickerState, setupTickerFetchingJob } from "./ticker.jobs";
import { initOnchainPriceState, setupOffchainPriceFetchingJob } from "./price.jobs";
import logger from "../utils/logger.util";
import store from "../redux/store";

const initAppState = async () => {
  logger.log("Initialising the app state");
  await initTickerState();

  const symbols = store.getState().tickers.symbols;
  await initOnchainPriceState(symbols);
};

export const initApp = async () => {
  await initAppState();

  await setupTickerFetchingJob();
  await setupOffchainPriceFetchingJob();
};