import { EPricesReduxActions, PricesReduxActions, PricesReduxReducerState } from "./prices.redux.types";
import { Reducer } from "redux";

const initialState: PricesReduxReducerState = {
  current: {},
  reverts: {}
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
    case EPricesReduxActions.ADD_PRICE_REVERTED_TX: {
      const {
        txHash,
        tickerSymbol,
        sentPrice,
        chainlinkPrice
      } = action.payload;

      return {
        ...state,
        reverts: {
          ...state.reverts,
          [txHash]: {
            tickerSymbol,
            sentPrice,
            chainlinkPrice
          }
        }
      }
    }
    default: {
      return initialState;
    }
  }
};

export default pricesReduxReducer;