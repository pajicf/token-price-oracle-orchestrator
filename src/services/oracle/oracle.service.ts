import Web3Service from "../web3.service";
import { CONFIG } from "../../config";
import logger from "../../utils/logger.util";

class OracleService {
  private _tickerPriceContract;

  constructor() {
    this._tickerPriceContract = Web3Service.getTickerPriceStorageContract(CONFIG.TICKER_PRICE_STORAGE, true);
  }
  
  public async updateOnchainPrice(ticker: string, newPrice: number) {
    const numberOfChainlinkDecimals = 8;
    // @TODO Update to use BigInt
    const parsedPrice = Math.trunc(newPrice * 10**numberOfChainlinkDecimals);
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
}

export default OracleService;