import { createAction, createReducer } from "../util/index";
import type {
	Partial,
	ReducersMapObject,
	ActionCreatorsMapObject,
} from "../types";

export function createPartial<
	S = any,
	R extends ReducersMapObject<S> = ReducersMapObject<S>,
>(
	name: string,
	initialState: S,
	reducers: R = {} as R,
	extraReducers: ReducersMapObject<S> = {},
): Partial<S> {
	const actionTypes: { [K in keyof R]: string } = {} as any;
	const actions: ActionCreatorsMapObject = {};

	// Generate action creators and types
	(Object.keys(reducers) as Array<keyof R>).forEach((type) => {
		const actionType = `${name}/${String(type)}`;
		actionTypes[type] = actionType;
		actions[String(type)] = createAction(actionType);
	});

	// Create the reducer
	const reducer = createReducer(initialState, {
		...Object.keys(reducers).reduce(
			(acc, type) => ({
				...acc,
				[actionTypes[type]]: reducers[type],
			}),
			{},
		),
		...extraReducers,
	});

	return {
		name,
		reducer,
		actions,
		actionTypes,
	};
}
