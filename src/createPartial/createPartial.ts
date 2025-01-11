import { Reducer } from "../type";

export function createPartial<S = any>(config: Partial<S>) {
	const { name, initialState, reducers, selectors = {} } = config;

	const actionCreators: { [key: string]: any } = {};
	const reducerMap: { [key: string]: Reducer<S> } = {};

	// Create action creators and reducers
	Object.entries(reducers).forEach(([key, reducer]) => {
		const type = `${name}/${key}`;
		actionCreators[key] = (payload?: any) => ({ type, payload });
		reducerMap[type] = reducer;
	});

	// Create the main reducer
	const reducer: Reducer<S> = (state = initialState, action) => {
		const handler = reducerMap[action.type];
		return handler ? handler(state, action) : state;
	};

	return {
		name,
		reducer,
		actions: actionCreators,
		selectors,
	};
}
