// src/middleware.ts

import { Middleware, Action } from "./types";

// Thunk middleware to support async actions
export const thunkMiddleware: Middleware =
	({ dispatch, getState }) =>
	(next) =>
	(action: Action | Function) => {
		if (typeof action === "function") {
			// If the action is a function, invoke it with dispatch and getState
			return action(dispatch, getState);
		}
		// Otherwise, pass the action to the next middleware/reducer
		return next(action);
	};

// Logger middleware to log every action and the next state
export const loggerMiddleware: Middleware =
	({ getState }) =>
	(next) =>
	(action: Action) => {
		console.log("Dispatching:", action);
		const result = next(action);
		console.log("Next State:", getState());
		return result;
	};
