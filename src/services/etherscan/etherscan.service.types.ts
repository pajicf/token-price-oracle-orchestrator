export type EtherscanResponse <T> = {
  status: string,
  message: string,
  result: T
}

export type EtherscanContractTxHistoryResponse = EtherscanResponse<{
  blockNumber: string,
  timeStamp: string,
  hash: string,
  nonce: string,
  blockHash: string,
  transactionIndex: string,
  from: string,
  to: string,
  value: string,
  gas: string,
  gasPrice: string,
  isError: string,
  txreceipt_status: string,
  input: string,
  contractAddress: string,
  cumulativeGasUsed: string,
  gasUsed: string,
  confirmations: string,
  methodId: string,
  functionName: string
}[]>

export type EtherscanRevertedTxHistory = {
  blockNumber: string,
  hash: string,
  input: string
}[]