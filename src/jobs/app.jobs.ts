import { initTickerState, setupTickerFetchingJob } from "./ticker.jobs";

const initAppState = async () => {
  await initTickerState();
};

export const initApp = async () => {
  await initAppState();

  await setupTickerFetchingJob();
};