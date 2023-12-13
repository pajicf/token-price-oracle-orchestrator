import { AxiosInstance } from "axios";
import { ApiRequestParams, AuthenticationData } from "../types/auth.types";
import ApiClient from "../utils/api.util";
import { DynamicObject } from "../types/util.types";

interface RestConfig {
  baseUrl?: string;
  authConfig?: AuthenticationData;
  headers?: DynamicObject<string>;
}

class RestService {
  protected rest: AxiosInstance;
  protected baseUrl: string;

  constructor(config?: RestConfig) {
    const { authConfig, baseUrl, headers } = config;

    // Setting the base url
    this.baseUrl = baseUrl || "";
    this.rest = ApiClient(baseUrl, authConfig, headers);
  }

  protected async get<T>(params: Omit<ApiRequestParams, "data">) {
    return this.rest.get<T>(params.url, params.config);
  }

  protected async post<T>(params: ApiRequestParams) {
    return this.rest.post<T>(params.url, params.data, params.config);
  }

  protected async put<T>(params: ApiRequestParams) {
    return this.rest.put<T>(params.url, params.data, params.config);
  }

  protected async delete<T>(params: Omit<ApiRequestParams, "data">) {
    return this.rest.delete<T>(params.url, params.config);
  }
}

export default RestService;
