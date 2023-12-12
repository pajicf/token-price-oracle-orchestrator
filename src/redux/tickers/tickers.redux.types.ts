import { ReduxAction } from "../redux.types";

export enum ETickerReduxActions {
  ADD_TICKER = "ADD_TICKER"
}

export type AddTickerAction = ReduxAction<ETickerReduxActions.ADD_TICKER, {
  tickerSymbol: string,
  chainlinkFeed: string
}>

export type TickerReduxActions =
  AddTickerAction;

export type TickerReduxReducerState = {
  symbols: string[],
  chainlinkFeed: {
    [symbol: string]: string
  }
}