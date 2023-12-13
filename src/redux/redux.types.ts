import { Action } from "redux";
import rootReducer from "./reducer";

export type RootState = ReturnType<typeof rootReducer>;

export interface ReduxAction<Type extends string, Payload extends Record<string, any>> extends Action<Type> {
  payload: Payload
}