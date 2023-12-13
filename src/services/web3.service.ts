import { ethers, JsonRpcProvider, Wallet } from "ethers";
import { TickerUSDFeedRegistryAbi__factory } from "../contracts";

import { CONFIG } from "../config";

class Web3Service {
  public provider: JsonRpcProvider;
  public signer: Wallet;

  constructor(providerUrl: string, signerPrivateKey: string) {
    this.provider = new ethers.JsonRpcProvider(providerUrl);
    this.signer = new ethers.Wallet(signerPrivateKey, this.provider);
  }

  public getTickerUSDFeedRegistryContract(address: string, isMutatingState?: boolean) {
    const contract =  TickerUSDFeedRegistryAbi__factory.connect(address);

    if (isMutatingState) {
      return contract.connect(this.signer);
    } else {
      return contract.connect(this.provider);
    }
  }
}

// We'll create a singleton for now while it's single network client
// Once multi-network support is needed, we'll have it modular enough
export default new Web3Service(
  CONFIG.ALCHEMY_URL,
  CONFIG.PRIVATE_KEY
);