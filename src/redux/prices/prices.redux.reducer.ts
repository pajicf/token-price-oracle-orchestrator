import { EPricesReduxActions, PricesReduxActions, PricesReduxReducerState } from "./prices.redux.types";
import { Reducer } from "redux";

const initialState: PricesReduxReducerState = {
  current: {}
};

const pricesReduxReducer: Reducer<PricesReduxReducerState, PricesReduxActions> = (state = initialState, action) => {
  switch (action.type) {
    case EPricesReduxActions.SET_CURRENT_ONCHAIN_PRICE: {
      const { tickerSymbol, onchainPrice } = action.payload;

      return {
        ...state,
        current: {
          ...state.current,
          [tickerSymbol]: {
            ...(state.current[tickerSymbol] || {}),
            onchain: onchainPrice
          }
        }
      };
    }
    case EPricesReduxActions.SET_CURRENT_OFFCHAIN_PRICE: {
      const { tickerSymbol, offchainPrice } = action.payload;

      return {
        ...state,
        current: {
          ...state.current,
          [tickerSymbol]: {
            ...(state.current[tickerSymbol] || {}),
            offchain: offchainPrice
          }
        }
      };
    }
    default: {
      return initialState;
    }
  }
};

export default pricesReduxReducer;