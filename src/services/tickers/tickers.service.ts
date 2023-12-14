import Web3Service from "../web3.service";
import { CONFIG } from "../../config";
import { TypedEventLog } from "../../contracts/common";
import { TickerRegistryData } from "./tickers.service.types";
import logger from "../../utils/logger.util";

class TickersService {
  private _registryContract;

  constructor() {
    this._registryContract =
      Web3Service.getTickerUSDFeedRegistryContract(CONFIG.TICKER_USD_FEED_REGISTRY);
  }

  public async listenForTickerUpdates(onTickerUpdate: (tickerData: TickerRegistryData) => void) {
    const startBlockNumber = await Web3Service.provider.getBlockNumber();
    const eventFilter = this._registryContract.filters.TickerFeedUpdated();

    await this._registryContract.on<any>(eventFilter, (data) => {
      if (data.log.blockNumber <= startBlockNumber) {
        return;
      }

      const parsedEvent = this.parseTickerFeedUpdatedEvent(data);
      logger.log("New ticker found: ", parsedEvent);

      onTickerUpdate(parsedEvent);
    });
  }

  public async getAllTickers(): Promise<Map<string, TickerRegistryData>> {
    const eventFilter = this._registryContract.filters.TickerFeedUpdated();
    const results = await this._registryContract.queryFilter(eventFilter, CONFIG.CONTRACTS_DEPLOYMENT_BLOCK);

    const tickerMap = new Map<string, TickerRegistryData>();
    results.forEach((result) => {
      const data = this.parseTickerFeedUpdatedEvent(result);
      tickerMap.set(data.tickerSymbol, data);
    });

    return tickerMap;
  }

  private parseTickerFeedUpdatedEvent(event: TypedEventLog<any>): TickerRegistryData {
    const args = event.args as [string, string];

    return {
      tickerSymbol: args[0],
      chainlinkFeedAddress: args[1]
    };
  }
}

export default TickersService;