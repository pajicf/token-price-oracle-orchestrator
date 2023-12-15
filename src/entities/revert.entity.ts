import { RootState } from "../redux/redux.types";
import { Nullable } from "../types/util.types";

export type RevertEntity = {
  txHash: string,
  tickerSymbol: string,
  sentPrice: number,
  chainlinkPrice: number
}

export function revertEntityFromReduxState(txHash: string, state: RootState): Nullable<RevertEntity> {
  const reverts = state.prices.reverts[txHash];

  if (reverts) {
    return {
      txHash: txHash,
      tickerSymbol: reverts.tickerSymbol,
      chainlinkPrice: reverts.chainlinkPrice,
      sentPrice: reverts.sentPrice
    };
  } else {
    return undefined;
  }
}