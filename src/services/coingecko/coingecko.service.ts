import RestService from "../rest.service";
import { CONFIG } from "../../config";
import { EAuthenticationType } from "../../types/auth.types";
import { arrayToString } from "../../utils/common.util";
import { CoinGeckoFiatCurrencies } from "../../constants/coingecko";
import {CoinGeckoMarketChartRangeResponse, CoinGeckoSimplePriceResponse} from "./coingecko.service.types";

class CoinGeckoService extends RestService {
  constructor() {
    super({
      baseUrl: CONFIG.COINGECKO_BASE_URL,
      authConfig: {
        type: EAuthenticationType.QUERY_PARAM,
        paramName: CONFIG.COINGECKO_API_KEY_QUERY_NAME,
        paramValue: CONFIG.COINGECKO_API_KEY
      }
    });
  }

  public async getPrices(ids: string[]): Promise<CoinGeckoSimplePriceResponse> {
    const response = await this.get<CoinGeckoSimplePriceResponse>({
      url: "simple/price",
      config: {
        params: {
          ids: arrayToString(ids),
          vs_currencies:  CoinGeckoFiatCurrencies.USD
        }
      }
    });

    return response.data;
  }

  public async getPriceHistory(id: string, from: number, to: number): Promise<CoinGeckoMarketChartRangeResponse> {
    const response = await this.get<CoinGeckoMarketChartRangeResponse>({
      url: `/coins/${id}/market_chart/range`,
      config: {
        params: {
          vs_currency: CoinGeckoFiatCurrencies.USD,
          from: from,
          to: to
        }
      }
    })

    return response.data;
  }
}

export default CoinGeckoService;