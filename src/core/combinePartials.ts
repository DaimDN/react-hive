// src/core/combinePartials.ts
import type { Partial, Store, AnyAction } from "../types";

export function combinePartials<S extends { [key: string]: any }>(
	partials: Array<Partial<S[keyof S]>>,
): Store<S> {
	const initialState = {} as S;
	const reducers: { [K in keyof S]: Partial<S[K]>["reducer"] } = {} as any;

	partials.forEach((partial) => {
		// Initialize with undefined state to get initial state from reducer
		initialState[partial.name as keyof S] = partial.reducer(undefined, {
			type: "@@INIT",
		});
		reducers[partial.name as keyof S] = partial.reducer;
	});

	const rootReducer = (state: S = initialState, action: AnyAction): S => {
		let hasChanged = false;
		const nextState = {} as S;

		(Object.keys(reducers) as Array<keyof S>).forEach((key) => {
			const prevStateForKey = state[key];
			// Here we know the state exists because we're using the initialState as default
			nextState[key] = reducers[key](prevStateForKey, action);
			hasChanged = hasChanged || nextState[key] !== prevStateForKey;
		});

		return hasChanged ? nextState : state;
	};

	return {
		initialState,
		reducer: rootReducer,
	};
}
