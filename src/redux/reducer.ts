import { combineReducers } from "redux";
import TickersReducer from "./tickers/tickers.redux.reducer";
import PricesReduxReducer from "./prices/prices.redux.reducer";

const rootReducer = combineReducers({
  tickers: TickersReducer,
  prices: PricesReduxReducer
});

export default rootReducer;