import { initTickerState, setupTickerFetchingJob } from "./ticker.jobs";
import { setupOffchainPriceFetchingJob } from "./price.jobs";

const initAppState = async () => {
  await initTickerState();
};

export const initApp = async () => {
  await initAppState();

  await setupTickerFetchingJob();
  await setupOffchainPriceFetchingJob();
};