import { AddTickerAction, ETickerReduxActions } from "./tickers.redux.types";

export function addTicker(tickerSymbol: string, chainlinkFeedAddress: string): AddTickerAction {
  return {
    type: ETickerReduxActions.ADD_TICKER,
    payload: {
      tickerSymbol,
      chainlinkFeed: chainlinkFeedAddress
    }
  };
}