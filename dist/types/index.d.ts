export type Action<T = any> = {
    type: string;
    payload?: T;
    meta?: any;
    error?: boolean;
};
export type Reducer<S = any, A extends Action = Action> = (state: S, action: A) => S;
export type MiddlewareAPI<S = any> = {
    getState: () => S;
    dispatch: Dispatch;
};
export type Middleware = (api: MiddlewareAPI) => (next: Dispatch) => (action: Action) => any;
export type Dispatch = (action: Action) => any;
export type Selector<S = any, R = any> = (state: S) => R;
export type AsyncThunk<R = any> = (dispatch: Dispatch, getState: () => any) => Promise<R>;
export interface Partial<S = any> {
    name: string;
    initialState: S;
    reducers: {
        [key: string]: (state: S, action: Action) => S;
    };
    selectors?: {
        [key: string]: Selector<S>;
    };
}
//# sourceMappingURL=index.d.ts.map