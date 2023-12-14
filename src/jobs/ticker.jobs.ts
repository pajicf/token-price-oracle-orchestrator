import TickersService from "../services/tickers/tickers.service";
import store from "../redux/store";
import { addTicker } from "../redux/tickers/tickers.redux.actions";
import { TickerRegistryData } from "../services/tickers/tickers.service.types";
import logger from "../utils/logger.util";

const tickersService = new TickersService();

const updateReduxTickerState = (tickerData: TickerRegistryData) => {
  store.dispatch(addTicker(tickerData.tickerSymbol, tickerData.chainlinkFeedAddress));
};

export const initTickerState = async () => {
  logger.log("Fetching all currently available tickers");
  const tickers = await tickersService.getAllTickers();
  logger.log("Tickers found: ", tickers);
  tickers.forEach(updateReduxTickerState);
};

export const setupTickerFetchingJob = async () => {
  logger.log("Setting up the Ticker Fetching observer");
  tickersService.listenForTickerUpdates(updateReduxTickerState).then();
};