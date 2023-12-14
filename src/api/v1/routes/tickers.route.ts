import TickersRouteDefinitions from "../definitions/tickers.route";
import { ETickersRoute } from "../definitions/tickers.route";
import { tickerEntityFromReduxState } from "../../../entities/ticker.entity";
import store from "../../../redux/store";
import { NotFoundError } from "../../../utils/errors.util";
import { APIResponse } from "../../../utils/response.util";

class TickersRoute {
  public static getTicker: TickersRouteDefinitions.RouteMethod<ETickersRoute.GetTicker> = async (request, response, next) => {
    try {
      const {
        tickerSymbol
      } = request.params;

      const tickerData = tickerEntityFromReduxState(tickerSymbol, store.getState());

      if (!tickerData) {
        throw new NotFoundError();
      }

      return response.status(200).json(APIResponse.success(tickerData));
    } catch (error) {
      next(error);
    }
  };

  public static getTickerList: TickersRouteDefinitions.RouteMethod<ETickersRoute.GetTickerList> = async (request, response, next) => {
    try {
      const rootState = store.getState();
      const symbols = rootState.tickers.symbols;

      const tickerList = symbols.map(symbol => tickerEntityFromReduxState(symbol, rootState));

      return response.status(200).json(APIResponse.success(tickerList));
    } catch (error) {
      next(error);
    }
  };
}

export default TickersRoute;