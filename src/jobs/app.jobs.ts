import { initTickerState, setupTickerFetchingJob } from "./ticker.jobs";
import { setupOffchainPriceFetchingJob } from "./price.jobs";
import logger from "../utils/logger.util";

const initAppState = async () => {
  logger.log("Initialising the app state");
  await initTickerState();
};

export const initApp = async () => {
  await initAppState();

  await setupTickerFetchingJob();
  await setupOffchainPriceFetchingJob();
};