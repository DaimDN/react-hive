// src/types/index.ts

export type AnyAction = {
	type: string;
	payload?: any;
};

export type Dispatch = (action: AnyAction | Function) => any;

export type MiddlewareAPI = {
	getState: () => any;
	dispatch: Dispatch;
};

export type NextFn = (action: AnyAction) => any;

export type Middleware = (
	api: MiddlewareAPI,
) => (next: NextFn) => (action: AnyAction) => any;

export type Reducer<S = any> = (state: S | undefined, action: AnyAction) => S;

export type ActionCreator<P = any> = {
	(payload: P): AnyAction;
	type: string;
};

export type ActionCreatorsMapObject = {
	[key: string]: ActionCreator;
};

export type ReducersMapObject<S = any> = {
	[key: string]: (state: S | undefined, payload: any) => S;
};

export type Partial<S = any> = {
	name: string;
	reducer: Reducer<S>;
	actions: ActionCreatorsMapObject;
	actionTypes: { [key: string]: string };
};

export type Store<S = any> = {
	initialState: S;
	reducer: Reducer<S>;
};

export type NovaState = {
	[key: string]: any;
};

export type NovaContextType = {
	state: NovaState;
	dispatch: Dispatch;
};
