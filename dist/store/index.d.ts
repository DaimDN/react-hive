import { Action, Reducer, Middleware } from "../../src/types";
export declare class Store<S = any> {
	private state;
	private reducer;
	private middleware;
	private listeners;
	constructor(reducer: Reducer<S>, initialState: S, middleware?: Middleware[]);
	getState(): S;
	dispatch: (action: Action) => any;
	subscribe(listener: () => void): () => void;
}
//# sourceMappingURL=index.d.ts.map
