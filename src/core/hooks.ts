// src/core/hooks.ts
import { useContext, useMemo } from "react";
import { NovaContext } from "./provider";
import type {
	ActionCreatorsMapObject,
	Dispatch,
	NovaState,
	ActionCreator,
} from "../types";

export function useNova() {
	const context = useContext(NovaContext);
	if (!context) {
		throw new Error("useNova must be used within a NovaProvider");
	}
	return context;
}

export function usePartial<T = any>(partialName: string): [T, Dispatch] {
	const { state, dispatch } = useNova();

	if (!(partialName in state)) {
		throw new Error(`Partial "${partialName}" not found in store`);
	}

	return [state[partialName] as T, dispatch];
}

export function useSelector<TSelected = unknown>(
	selector: (state: NovaState) => TSelected,
	equalityFn: (left: TSelected, right: TSelected) => boolean = Object.is,
): TSelected {
	const { state } = useNova();

	return useMemo(() => selector(state), [selector, state]);
}

type BoundActionCreator<A extends ActionCreator> = (
	...args: Parameters<A>
) => ReturnType<Dispatch>;

type BoundActionCreators<T extends ActionCreatorsMapObject> = {
	[K in keyof T]: BoundActionCreator<T[K]>;
};

export function useActions<T extends ActionCreatorsMapObject>(
	actions: T | Array<T[keyof T]>,
): T extends Array<any>
	? Array<BoundActionCreator<T[number]>>
	: BoundActionCreators<T> {
	const { dispatch } = useNova();

	return useMemo(() => {
		if (Array.isArray(actions)) {
			return actions.map(
				(action: any) =>
					((...args: Parameters<typeof action>) =>
						dispatch(action(...args))) as BoundActionCreator<typeof action>,
			);
		}

		return Object.keys(actions).reduce((bound: any, key) => {
			const action = actions[key];
			bound[key] = ((...args: Parameters<typeof action>) =>
				dispatch(action(...args))) as BoundActionCreator<typeof action>;
			return bound;
		}, {} as BoundActionCreators<T>);
	}, [actions, dispatch]) as any;
}
