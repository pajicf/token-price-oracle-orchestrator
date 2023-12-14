import TickersRouteDefinitions from "../definitions/tickers.route";
import { val } from "../middlewares/validate.middleware";
import { checkSchema } from "express-validator";
import { ValidatorFields } from "../../../types/util.types";

type GetTickerFields =
  (keyof TickersRouteDefinitions.TickerParams)

const getTickerSchema: ValidatorFields<GetTickerFields> = {
  tickerSymbol: {
    in: ["params"],
    errorMessage: "Ticker must be a string",
    isString: true
  }
};

export default class TickersValidator {
  public static validateGetTicker = val(checkSchema(getTickerSchema));
}