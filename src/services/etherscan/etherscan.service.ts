import RestService from "../rest.service";
import { CONFIG } from "../../config";
import { EAuthenticationType } from "../../types/auth.types";
import { EtherscanContractTxHistoryResponse, EtherscanRevertedTxHistory } from "./etherscan.service.types";
import {ethers} from "ethers";

class EtherscanService extends RestService {
  constructor() {
    super({
      baseUrl: CONFIG.ETHERSCAN_BASE_URL,
      authConfig: {
        type: EAuthenticationType.QUERY_PARAM,
        paramName: CONFIG.ETHERSCAN_API_KEY_QUERY_NAME,
        paramValue: CONFIG.ETHERSCAN_API_KEY
      }
    });
  }

  public async getContractTxHistory(contractAddress: string, startBlock: number): Promise<EtherscanContractTxHistoryResponse> {
    const response = await this.get<EtherscanContractTxHistoryResponse>({
      url: "api",
      config: {
        params: {
          module: "account",
          action: "txlist",
          address: contractAddress,
          startBlock: startBlock,
          sort: "asc"
        }
      }
    });

    return response.data;
  }

  public async getRevertedTxHistory(contractAddress: string, startBlock: number): Promise<EtherscanRevertedTxHistory> {
    const apiResponse = await this.getContractTxHistory(contractAddress, startBlock);
    const results: EtherscanRevertedTxHistory = [];

    if (apiResponse.status == "1" && apiResponse.result.length > 0) {
      apiResponse.result.forEach(etherscanResponse => {
        if (etherscanResponse.isError == "1") {
          results.push({
            blockNumber: etherscanResponse.blockNumber,
            hash: etherscanResponse.hash,
            input: etherscanResponse.input
          });
        }
      });
    } else {
      return [];
    }

    return results;
  }
}

export default EtherscanService;