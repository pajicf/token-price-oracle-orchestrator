import axios, { AxiosRequestConfig } from "axios";
import { EAuthenticationType, AuthenticationData } from "../types/auth.types";
import { DynamicObject } from "../types/util.types";
import { AuthenticationError, AuthorizationError } from "./errors.util";

function ApiClient(baseUrl: string, auth?: AuthenticationData, additionalHeaders?: DynamicObject<string>) {
  const headers: DynamicObject = { ...additionalHeaders };
  const additionalParams: AxiosRequestConfig<any>["params"] = {};

  if (auth) {
    if (auth.type === EAuthenticationType.QUERY_PARAM) {
      additionalParams[auth.paramName] = auth.paramValue;
    }
  }

  const client = axios.create({
    baseURL: baseUrl,
    headers
  });

  client.interceptors.request.use((config) => {
    config.params = {
      ...(config.params || {}),
      ...additionalParams
    };

    return config;
  });

  // Init the interceptors
  client.interceptors.response.use(
    function onResponse(response) {
      return response;
    },
    function onError(error) {
      if (error.response && error.response.status) {
        const errorCode = error.response.status;

        if (errorCode === 401) {
          return Promise.reject(new AuthenticationError());
        } else if (errorCode === 403) {
          return Promise.reject(new AuthorizationError());
        }
      } else {
        return Promise.reject(error);
      }
    }
  );

  return client;
}

export default ApiClient;
