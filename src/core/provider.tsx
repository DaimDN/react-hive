import * as React from "react";

type NovaContextType = {
	state: any;
	dispatch: React.Dispatch<any>;
};

export const NovaContext = React.createContext<NovaContextType | null>(null);

type Store = {
	initialState: any;
	reducer: React.Reducer<any, any>;
};

type NovaProviderProps = {
	children: React.ReactNode;
	store: Store;
};

export function NovaProvider({ children, store }: NovaProviderProps) {
	const reducerState = React.useReducer(store.reducer, store.initialState);
	const [state, dispatch] = reducerState;

	const value = React.useMemo(
		() => ({
			state,
			dispatch,
		}),
		[state],
	);

	return <NovaContext.Provider value={value}>{children}</NovaContext.Provider>;
}
