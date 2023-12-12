import TickersService from "../services/tickers/tickers.service";
import store from "../redux/store";
import { addTicker } from "../redux/tickers/tickers.redux.actions";
import { TickerRegistryData } from "../services/tickers/tickers.service.types";

const tickersService = new TickersService();

const updateReduxTickerState = (tickerData: TickerRegistryData) => {
  store.dispatch(addTicker(tickerData.tickerSymbol, tickerData.chainlinkFeedAddress));
};

export const initTickerState = async () => {
  const tickers = await tickersService.getAllTickers();
  tickers.forEach(updateReduxTickerState);
};

export const setupTickerFetchingJob = async () => {
  tickersService.listenForTickerUpdates(updateReduxTickerState).then();
};