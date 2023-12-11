import { AxiosRequestConfig } from "axios";

export enum EAuthenticationType {
  QUERY_PARAM = "QUERY_PARAM"
}

type AuthenticationType = {
  type: EAuthenticationType;
}

export type QueryParamAuthentication = AuthenticationType & {
  type: EAuthenticationType.QUERY_PARAM;
  paramName: string;
  paramValue: string;
}

export interface ApiRequestParams {
  url: string;
  config?: AxiosRequestConfig;
  data?: any;
}

export type AuthenticationData =
  QueryParamAuthentication