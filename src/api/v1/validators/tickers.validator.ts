import TickersRouteDefinitions from "../definitions/tickers.route";
import { val } from "../middlewares/validate.middleware";
import { checkSchema } from "express-validator";
import { ValidatorFields } from "../../../types/util.types";
import {MinMaxOptions} from "express-validator/src/options";
import {ExistsOptions} from "express-validator/src/chain";

type GetTickerFields = keyof (
  TickersRouteDefinitions.TickerParams
)

const getTickerSchema: ValidatorFields<GetTickerFields> = {
  tickerSymbol: {
    in: ["params"],
    errorMessage: "Ticker must be a string",
    isString: true,
    isLength: {
      errorMessage: "Ticker must be less than 3 characters",
      options: { max: 3 }
    }
  }
};

type GetTickerPriceHistoryFields = keyof (
  TickersRouteDefinitions.TickerParams &
  TickersRouteDefinitions.TickerPriceHistoryQueries
)

const getTickerPriceHistorySchema: ValidatorFields<GetTickerPriceHistoryFields> = {
  tickerSymbol: {
    in: ["params"],
    errorMessage: "Ticker must be a string",
    isString: true,
    isLength: {
      errorMessage: "Ticker must be less than 3 characters",
      options: { max: 3 }
    }
  },
  from: {
    errorMessage: "Must be a valid UNIX timestamp",
    in: ["query"],
    isInt: {
      options: {
        min: 0
      }
    }
  },
  to: {
    errorMessage: "Must be a valid UNIX timestamp",
    in: ["query"],
    isInt: {
      options: {
        min: 0
      }
    }
  }
}

export default class TickersValidator {
  public static validateGetTicker = val(checkSchema(getTickerSchema));

  public static validateGetTickerPriceHistory = val(checkSchema(getTickerPriceHistorySchema));
}