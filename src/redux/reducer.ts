import { combineReducers } from "redux";
import TickersReducer from "./tickers/tickers.redux.reducer";

const rootReducer = combineReducers({
  tickers: TickersReducer
});

export default rootReducer;