import type { ActionCreator } from "../types";
import type { Reducer, ReducersMapObject } from "../types";
export declare function createAction<P = any>(type: string): ActionCreator<P>;
export declare function createReducer<S>(initialState: S, handlers: ReducersMapObject<S>): Reducer<S>;
//# sourceMappingURL=index.d.ts.map