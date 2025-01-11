import React, {
	createContext,
	useContext,
	useReducer,
	useCallback,
	useMemo,
} from "react";
import { Reducer, Middleware, MiddlewareAPI, Action } from "../type";

export class Store<S = any> {
	private state: S;
	private reducer: Reducer<S>;
	private middleware: Middleware[] = [];
	private listeners: Set<() => void> = new Set();

	constructor(
		reducer: Reducer<S>,
		initialState: S,
		middleware: Middleware[] = [],
	) {
		this.state = initialState;
		this.reducer = reducer;
		this.middleware = middleware;
	}

	getState(): S {
		return this.state;
	}

	dispatch = (action: Action): any => {
		let dispatchFunction = (action: Action) => {
			this.state = this.reducer(this.state, action);
			this.listeners.forEach((listener) => listener());
			return action;
		};

		// Apply middleware
		if (this.middleware.length > 0) {
			const middlewareAPI: MiddlewareAPI = {
				getState: this.getState.bind(this),
				dispatch: (action: Action) => dispatchFunction(action),
			};

			const chain = this.middleware.map((middleware) =>
				middleware(middlewareAPI),
			);
			dispatchFunction = chain.reduce((a, b) => (action) => b(a as any))(
				dispatchFunction,
			);
		}

		return dispatchFunction(action);
	};

	subscribe(listener: () => void): () => void {
		this.listeners.add(listener);
		return () => this.listeners.delete(listener);
	}
}
