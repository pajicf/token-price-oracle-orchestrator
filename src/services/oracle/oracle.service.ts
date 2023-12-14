import Web3Service from "../web3.service";
import { CONFIG } from "../../config";

class OracleService {
  private _tickerPriceContract;

  constructor() {
    this._tickerPriceContract = Web3Service.getTickerPriceStorageContract(CONFIG.TICKER_PRICE_STORAGE, true);
  }
  
  public async updateOnchainPrice(ticker: string, newPrice: number) {
    const numberOfChainlinkDecimals = 8;
    // @TODO Update to use BigInt
    const parsedPrice = Math.trunc(newPrice * 10**numberOfChainlinkDecimals);

    const willRevert = await this.isPriceUpdateGoingToRevert(ticker, parsedPrice);

    if(!willRevert) {
      const tx = await this._tickerPriceContract.set(ticker, parsedPrice);
      await tx.wait(1);
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