import { Reducer } from "redux";
import { ETickerReduxActions, TickerReduxActions, TickerReduxReducerState } from "./tickers.redux.types";

const initialState: TickerReduxReducerState = {
  symbols: [],
  chainlinkFeed: {}
};

const tickersReduxReducer: Reducer<TickerReduxReducerState, TickerReduxActions> = (state = initialState, action) => {
  switch (action.type) {
    case ETickerReduxActions.ADD_TICKER: {
      const { tickerSymbol, chainlinkFeed } = action.payload;

      // Can be optimized, but sufficient for current number of supported tickers
      let newSymbolArray: string[];
      if (state.symbols.includes(tickerSymbol)) {
        newSymbolArray = state.symbols;
      } else {
        newSymbolArray = [...state.symbols, tickerSymbol];
      }

      return {
        ...state,
        symbols: newSymbolArray,
        chainlinkFeed: {
          ...state.chainlinkFeed,
          [tickerSymbol]: chainlinkFeed
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default tickersReduxReducer;