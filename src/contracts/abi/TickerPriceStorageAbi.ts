/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface TickerPriceStorageAbiInterface extends Interface {
  getFunction(nameOrSignature: "set"): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "TickerPriceUpdated"): EventFragment;

  encodeFunctionData(
    functionFragment: "set",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "set", data: BytesLike): Result;
}

export namespace TickerPriceUpdatedEvent {
  export type InputTuple = [ticker: string, newPrice: BigNumberish];
  export type OutputTuple = [ticker: string, newPrice: bigint];
  export interface OutputObject {
    ticker: string;
    newPrice: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface TickerPriceStorageAbi extends BaseContract {
  connect(runner?: ContractRunner | null): TickerPriceStorageAbi;
  waitForDeployment(): Promise<this>;

  interface: TickerPriceStorageAbiInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  set: TypedContractMethod<
    [ticker: string, price: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "set"
  ): TypedContractMethod<
    [ticker: string, price: BigNumberish],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "TickerPriceUpdated"
  ): TypedContractEvent<
    TickerPriceUpdatedEvent.InputTuple,
    TickerPriceUpdatedEvent.OutputTuple,
    TickerPriceUpdatedEvent.OutputObject
  >;

  filters: {
    "TickerPriceUpdated(string,uint256)": TypedContractEvent<
      TickerPriceUpdatedEvent.InputTuple,
      TickerPriceUpdatedEvent.OutputTuple,
      TickerPriceUpdatedEvent.OutputObject
    >;
    TickerPriceUpdated: TypedContractEvent<
      TickerPriceUpdatedEvent.InputTuple,
      TickerPriceUpdatedEvent.OutputTuple,
      TickerPriceUpdatedEvent.OutputObject
    >;
  };
}
