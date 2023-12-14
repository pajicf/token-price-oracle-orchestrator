import { ethers, JsonRpcProvider, Wallet } from "ethers";
import { TickerPriceStorageAbi__factory, TickerUSDFeedRegistryAbi__factory } from "../contracts";

import { CONFIG } from "../config";

class Web3Service {
  public provider: JsonRpcProvider;
  public signer: Wallet;

  constructor(providerUrl: string, signerPrivateKey: string) {
    this.provider = new ethers.JsonRpcProvider(providerUrl);
    this.signer = new ethers.Wallet(signerPrivateKey, this.provider);
  }

  private _getRunner(isMutatingState: boolean) {
    return isMutatingState ? this.signer : this.provider;
  }

  public getTickerUSDFeedRegistryContract(address: string, isMutatingState?: boolean) {
    return TickerUSDFeedRegistryAbi__factory.connect(address, this._getRunner(!!isMutatingState));
  }

  public getTickerPriceStorageContract(address: string, isMutatingState?: boolean) {
    return TickerPriceStorageAbi__factory.connect(address, this._getRunner(!!isMutatingState));
  }
}

// We'll create a singleton for now while it's single network client
// Once multi-network support is needed, we'll have it modular enough
export default new Web3Service(
  CONFIG.ALCHEMY_URL,
  CONFIG.PRIVATE_KEY
);