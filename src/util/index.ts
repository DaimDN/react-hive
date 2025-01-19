import type { ActionCreator, AnyAction } from "../types";
import type { Reducer, ReducersMapObject } from "../types";

export function createAction<P = any>(type: string): ActionCreator<P> {
	const actionCreator = ((payload: P): AnyAction => ({
		type,
		payload,
	})) as ActionCreator<P>;

	actionCreator.type = type;
	return actionCreator;
}

export function createReducer<S>(
	initialState: S,
	handlers: ReducersMapObject<S>,
): Reducer<S> {
	return (state: S = initialState, action: AnyAction): S => {
		if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
			return handlers[action.type](state, action.payload);
		}
		return state;
	};
}
