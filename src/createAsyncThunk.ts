// src/createAsyncThunk.ts

import { Action, AsyncThunk } from "./types";

export function createAsyncThunk<P = void, R = any>(
	type: string,
	payloadCreator: (payload: P) => Promise<R>,
) {
	return (payload: P): AsyncThunk<R> =>
		async (dispatch, getState) => {
			try {
				dispatch({ type: `${type}/pending`, payload });
				const result = await payloadCreator(payload);
				dispatch({ type: `${type}/fulfilled`, payload: result });
				return result;
			} catch (error) {
				dispatch({ type: `${type}/rejected`, error: true, payload: error });
				throw error;
			}
		};
}
