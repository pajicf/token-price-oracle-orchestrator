import {EmptyObject, ParamsDictionary} from "../../../types/util.types";
import {TickerEntity} from "../../../entities/ticker.entity";
import {IResponseSuccess} from "../../../utils/response.util";
import {NextFunction, Request as ExpressRequest, Response as ExpressResponse} from "express";


export enum ETickersRoute {
  GetTickerList = "GetTickerList",
  GetTicker = "GetTicker",
  GetTickerHistory = "GetTickerHistory"
}

declare namespace TickersRouteDefinitions {
  type ResponseBody<T extends ETickersRoute> =
    // GET /tickers/[ticker]
    T extends ETickersRoute.GetTicker ? TickerEntity :
    // GET /tickers
    T extends ETickersRoute.GetTickerList ? TickerEntity[] :
    // GET /tickers/[ticker]/history
    T extends ETickersRoute.GetTickerHistory ? EmptyObject :
    EmptyObject

  type RequestBody<T extends ETickersRoute> =
    EmptyObject;

  type RequestQueries<T extends ETickersRoute> =
    EmptyObject

  type RequestParams<T extends ETickersRoute> =
    // GET /tickers/[ticker]
    T extends ETickersRoute.GetTicker ? TickerParams :
    // GET /tickers/[ticker]/history
    T extends ETickersRoute.GetTickerHistory ? TickerParams :
    EmptyObject;

  type Response<T extends ETickersRoute> = ExpressResponse<IResponseSuccess<ResponseBody<T>>>

  type Request<T extends ETickersRoute> = ExpressRequest<RequestParams<T> & ParamsDictionary, IResponseSuccess<ResponseBody<T>>, RequestBody<T>, RequestQueries<T>>

  type RouteMethod<T extends ETickersRoute> = (request: Request<T>, response: Response<T>, next: NextFunction) => Promise<any>;

  // PARAMS
  type TickerParams = {
    tickerSymbol: string;
  }
}

export default TickersRouteDefinitions;