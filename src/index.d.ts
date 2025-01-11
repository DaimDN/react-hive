import { Dispatch, Reducer, Selector } from "./types";

/**
 * Store class definition.
 *
 * Manages global state, reducer, middleware, and listeners.
 */
export class Store<S = any> {
	// Private properties
	private state: S;
	private reducer: Reducer<S>;
	private middleware: Middleware[];
	private listeners: Set<() => void>;

	/**
	 * Constructor.
	 *
	 * Initializes the store with reducer, initial state, and middleware.
	 *
	 * @param reducer Reducer function.
	 * @param initialState Initial state.
	 * @param middleware Middleware functions.
	 */
	constructor(reducer: Reducer<S>, initialState: S, middleware: Middleware[]) {}

	/**
	 * Returns the current state.
	 */
	getState(): S {}

	/**
	 * Dispatches an action to the store.
	 *
	 * Triggers the reducer and middleware.
	 *
	 * @param action Action object.
	 */
	dispatch(action: Action): any {}

	/**
	 * Subscribes a listener to state changes.
	 *
	 * @param listener Listener function.
	 * @returns Unsubscribe function.
	 */
	subscribe(listener: () => void): () => void {}
}

/**
 * StoreProvider props interface.
 */
export interface StoreProviderProps {
	/**
	 * Store instance.
	 */
	store: Store<any>;
	/**
	 * Child components.
	 */
	children: React.ReactNode;
}

/**
 * StoreProvider component.
 *
 * Wraps the application with the Store context.
 */
export const StoreProvider: React.FC<StoreProviderProps>;

/**
 * Custom hook for accessing the store.
 *
 * @returns Store instance.
 */
export function useStore<S = any>(): Store<S> {}

/**
 * Custom hook for selecting state.
 *
 * @param selector Selector function.
 * @returns Selected state.
 */
export function useSelector<S = any, R = any>(selector: Selector<S, R>): R {}

/**
 * Custom hook for dispatching actions.
 *
 * @returns Dispatch function.
 */
export function useDispatch(): Dispatch {}

// Type definitions

/**
 * Action type.
 */
export type Action<T = any> = {
	/**
	 * Action type.
	 */
	type: string;
	/**
	 * Payload.
	 */
	payload?: T;
	/**
	 * Metadata.
	 */
	meta?: any;
	/**
	 * Error flag.
	 */
	error?: boolean;
};

/**
 * Middleware type.
 */
export type Middleware = (
	api: MiddlewareAPI,
) => (next: Dispatch) => (action: Action) => any;

/**
 * Middleware API.
 */
export type MiddlewareAPI<S = any> = {
	/**
	 * Get current state.
	 */
	getState: () => S;
	/**
	 * Dispatch function.
	 */
	dispatch: Dispatch;
};

/**
 * Async thunk type.
 */
export type AsyncThunk<R = any> = (
	dispatch: Dispatch,
	getState: () => any,
) => Promise<R>;

/**
 * Selector function type.
 */
export type Selector<S = any, R = any> = (state: S) => R;

/**
 * Dispatch function type.
 */
export type Dispatch = (action: Action) => any;

/**
 * Reducer function type.
 */
export type Reducer<S = any, A extends Action = Action> = (
	state: S,
	action: A,
) => S;
