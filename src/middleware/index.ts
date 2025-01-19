// src/middleware/logger.ts
import type { Middleware, AnyAction } from "../types";

export const logger: Middleware =
	({ getState }) =>
	(next) =>
	(action: AnyAction) => {
		console.group(action.type);
		console.log("prev state", getState());
		console.log("action", action);
		const result = next(action);
		console.log("next state", getState());
		console.groupEnd();
		return result;
	};
/**
 * 
export const thunk: Middleware =
	(api: MiddlewareAPI) => (next) => (action: AnyAction) => {
		if (typeof action === "function") {
			return action(api.dispatch, api.getState);
		}
		return next(action);
	};

 */
