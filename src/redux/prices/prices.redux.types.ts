import { ReduxAction } from "../redux.types";

export enum EPricesReduxActions {
  SET_CURRENT_ONCHAIN_PRICE = "SET_CURRENT_ONCHAIN_PRICE",
  SET_CURRENT_OFFCHAIN_PRICE = "SET_CURRENT_OFFCHAIN_PRICE",
  ADD_PRICE_REVERTED_TX = "ADD_PRICE_REVERTED_TX"
}

export type SetCurrentOnchainPriceAction = ReduxAction<EPricesReduxActions.SET_CURRENT_ONCHAIN_PRICE, {
  tickerSymbol: string,
  onchainPrice: number;
}>

export type SetCurrentOffchainPriceAction = ReduxAction<EPricesReduxActions.SET_CURRENT_OFFCHAIN_PRICE, {
  tickerSymbol: string;
  offchainPrice: number;
}>

export type AddPriceRevertedTx = ReduxAction<EPricesReduxActions.ADD_PRICE_REVERTED_TX, {
  txHash: string,
  tickerSymbol: string,
  sentPrice: number,
  chainlinkPrice: number
}>

export type PricesReduxActions =
  SetCurrentOnchainPriceAction |
  SetCurrentOffchainPriceAction |
  AddPriceRevertedTx;

export type PricesReduxReducerState = {
  current: {
    [tickerSymbol: string]: {
      onchain?: number;
      offchain?: number;
    }
  }
  reverts: {
    [txHash: string]: {
      tickerSymbol: string,
      sentPrice: number,
      chainlinkPrice: number
    }
  }
}