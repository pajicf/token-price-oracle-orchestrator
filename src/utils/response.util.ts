import { DynamicObject } from "../types/util.types";

export interface IResponseSuccess<T extends DynamicObject | Array<any>> {
  result: T;
}

interface IResponseError {
  error: {
    code: number,
    message: string;
  };
  details?: any;
}

export class APIResponse {
  public static success<T extends DynamicObject | Array<any>>(data: T): IResponseSuccess<T> {
    return {
      result: data
    };
  }

  public static error(code: number, message: string, errors?: any): IResponseError {
    return {
      error: {
        code,
        message
      },
      details: errors
    };
  }
}
