import {
  AddPriceRevertedTx,
  EPricesReduxActions,
  SetCurrentOffchainPriceAction,
  SetCurrentOnchainPriceAction
} from "./prices.redux.types";

export function setCurrentOnchainPrice(tickerSymbol: string, onchainPrice: number): SetCurrentOnchainPriceAction {
  return {
    type: EPricesReduxActions.SET_CURRENT_ONCHAIN_PRICE,
    payload: {
      tickerSymbol,
      onchainPrice
    }
  };
}

export function setCurrentOffchainPrice(tickerSymbol: string, offchainPrice: number): SetCurrentOffchainPriceAction {
  return {
    type: EPricesReduxActions.SET_CURRENT_OFFCHAIN_PRICE,
    payload: {
      tickerSymbol,
      offchainPrice
    }
  };
}

export function addPriceRevertedTx(txHash: string, tickerSymbol: string, sentPrice: number, chainlinkPrice: number): AddPriceRevertedTx {
  return {
    type: EPricesReduxActions.ADD_PRICE_REVERTED_TX,
    payload: {
      txHash,
      tickerSymbol,
      sentPrice,
      chainlinkPrice
    }
  };
}