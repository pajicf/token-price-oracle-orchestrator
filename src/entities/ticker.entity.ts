import { RootState } from "../redux/redux.types";
import { Nullable } from "../types/util.types";

export type TickerEntity =  {
  symbol: string;
  onchainPrice?: number;
  offchainPrice?: number;
}

export function tickerEntityFromReduxState(tickerSymbol: string, state: RootState): Nullable<TickerEntity> {
  const tickerPrices = state.prices.current[tickerSymbol];

  if (tickerPrices) {
    return {
      symbol: tickerSymbol,
      onchainPrice: tickerPrices.onchain,
      offchainPrice: tickerPrices.offchain
    };
  } else {
    return undefined;
  }
}