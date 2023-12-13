import {ReduxAction} from "../redux.types";

export enum EPricesReduxActions {
  SET_CURRENT_ONCHAIN_PRICE = "SET_CURRENT_ONCHAIN_PRICE",
  SET_CURRENT_OFFCHAIN_PRICE = "SET_CURRENT_OFFCHAIN_PRICE",
}

export type SetCurrentOnchainPriceAction = ReduxAction<EPricesReduxActions.SET_CURRENT_ONCHAIN_PRICE, {
  tickerSymbol: string,
  onchainPrice: number;
}>

export type SetCurrentOffchainPriceAction = ReduxAction<EPricesReduxActions.SET_CURRENT_OFFCHAIN_PRICE, {
  tickerSymbol: string;
  offchainPrice: number;
}>

export type PricesReduxActions =
  SetCurrentOnchainPriceAction |
  SetCurrentOffchainPriceAction;

export type PricesReduxReducerState = {
  current: {
    [tickerSymbol: string]: {
      onchain?: number;
      offchain?: number;
    }
  }
}