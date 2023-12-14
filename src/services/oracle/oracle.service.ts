import Web3Service from "../web3.service";
import { CONFIG } from "../../config";
import logger from "../../utils/logger.util";
import { TypedEventLog } from "../../contracts/common";
import { TickerPriceData } from "./oracle.service.types";

class OracleService {
  private _tickerPriceContract;
  private readonly _numberOfChainlinkDecimals = 8;

  constructor() {
    this._tickerPriceContract = Web3Service.getTickerPriceStorageContract(CONFIG.TICKER_PRICE_STORAGE, true);
  }
  
  public async updateOnchainPrice(ticker: string, newPrice: number) {
    // @TODO Update to use BigInt
    const parsedPrice = Math.trunc(newPrice * 10**this._numberOfChainlinkDecimals);
    logger.log("Trying to update onchain price of ", ticker, " to ", newPrice);

    const willRevert = await this.isPriceUpdateGoingToRevert(ticker, parsedPrice);

    if(!willRevert) {
      const tx = await this._tickerPriceContract.set(ticker, parsedPrice);
      logger.info(`Transaction for updating ${ticker} to ${newPrice} sent, tx hash: ${tx.hash}`);
      await tx.wait(1);
      logger.info(`Transaction with tx hash: ${tx.hash} successful`);
    } else {
      logger.info(`Updating ticker ${ticker} to price ${newPrice} canceled`);
    }
  }

  public async isPriceUpdateGoingToRevert(ticker: string, newPrice: number): Promise<boolean> {
    try {
      await this._tickerPriceContract.set.staticCall(ticker, newPrice);

      return false;
    } catch (err) {
      return true;
    }
  }

  public async getOnchainPrice(tickerSymbol: string): Promise<number> {
    const eventFilter = this._tickerPriceContract.filters.TickerPriceUpdated(tickerSymbol);
    const results = await this._tickerPriceContract.queryFilter(eventFilter);

    if (results.length > 0 ) {
      const latestEvent = this.parseTickerPriceUpdatedEvent(results[results.length-1]);
      return latestEvent.newPrice;
    } else {
      return 0;
    }
  }

  public async listenForOnchainPriceUpdates(tickerSymbol: string, onPriceUpdate: (tickerPriceData: TickerPriceData) => void) {
    const startBlockNumber = await Web3Service.provider.getBlockNumber();
    const eventFilter = this._tickerPriceContract.filters.TickerPriceUpdated(tickerSymbol);

    await this._tickerPriceContract.on<any>(eventFilter, (data) => {
      if (data.log.blockNumber <= startBlockNumber) {
        return;
      }

      const parsedEvent = this.parseTickerPriceUpdatedEvent(data);
      logger.log(`${parsedEvent.tickerSymbol} price updated on-chain to ${parsedEvent.newPrice}`);

      onPriceUpdate(parsedEvent);
    });
  }

  private parseTickerPriceUpdatedEvent(event: TypedEventLog<any>): TickerPriceData {
    const args = event.args as [string, number];
    const newPrice = args[1];
    const parsedPrice = (Number(newPrice) / (10**this._numberOfChainlinkDecimals));

    return {
      tickerSymbol: args[0],
      newPrice: parsedPrice
    };
  }
}

export default OracleService;