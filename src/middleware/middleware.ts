import { Middleware } from "../type";

export const thunkMiddleware: Middleware =
	({ dispatch, getState }) =>
	(next) =>
	(action: any) => {
		if (typeof action === "function") {
			return action(dispatch, getState);
		}
		return next(action);
	};

export const loggerMiddleware: Middleware =
	({ getState }) =>
	(next) =>
	(action) => {
		console.log("Dispatching:", action);
		const result = next(action);
		console.log("Next State:", getState());
		return result;
	};
