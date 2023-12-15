import { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from "express";
import { IResponseSuccess } from "../../../utils/response.util";
import { EmptyObject, ParamsDictionary } from "../../../types/util.types";
import { RevertEntity } from "../../../entities/revert.entity";

export enum ERevertsRoute {
  GetRevertList = "GetRevertList"
}

declare namespace RevertsRouteDefinitions {
  type ResponseBody<T extends ERevertsRoute> =
    T extends ERevertsRoute.GetRevertList ? RevertEntity[] :
    EmptyObject

  type RequestBody<T extends ERevertsRoute> = // eslint-disable-line @typescript-eslint/no-unused-vars
    EmptyObject;

  type RequestQueries<T extends ERevertsRoute> = // eslint-disable-line @typescript-eslint/no-unused-vars
    EmptyObject

  type RequestParams<T extends ERevertsRoute> = // eslint-disable-line @typescript-eslint/no-unused-vars
    EmptyObject

  type Response<T extends ERevertsRoute> = ExpressResponse<IResponseSuccess<ResponseBody<T>>>

  type Request<T extends ERevertsRoute> = ExpressRequest<RequestParams<T> & ParamsDictionary, IResponseSuccess<ResponseBody<T>>, RequestBody<T>, RequestQueries<T>>

  type RouteMethod<T extends ERevertsRoute> = (request: Request<T>, response: Response<T>, next: NextFunction) => Promise<any>;
}

export default RevertsRouteDefinitions;