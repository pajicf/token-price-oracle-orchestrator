import {EPricesReduxActions, SetCurrentOffchainPriceAction, SetCurrentOnchainPriceAction} from "./prices.redux.types";

export function setCurrentOnchainPrice(tickerSymbol: string, onchainPrice: number): SetCurrentOnchainPriceAction {
  return {
    type: EPricesReduxActions.SET_CURRENT_ONCHAIN_PRICE,
    payload: {
      tickerSymbol,
      onchainPrice
    }
  }
}

export function setCurrentOffchainPrice(tickerSymbol: string, offchainPrice: number): SetCurrentOffchainPriceAction {
  return {
    type: EPricesReduxActions.SET_CURRENT_OFFCHAIN_PRICE,
    payload: {
      tickerSymbol,
      offchainPrice
    }
  }
}