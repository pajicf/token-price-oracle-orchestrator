import { ChainlinkAggregatorV3Abi } from "../contracts";
import Web3Service from "./web3.service";

class ChainlinkService {
  private _aggregatorContract: ChainlinkAggregatorV3Abi;

  constructor(aggregatorAddress: string) {
    this._aggregatorContract = Web3Service.getChainlinkPriceFeedContract(aggregatorAddress);
  }

  public async getPriceForBlock(blockNumber: number) {
    const result = await this._aggregatorContract.latestRoundData({
      blockTag: blockNumber
    });

    return result.answer;
  }
}

export default ChainlinkService;