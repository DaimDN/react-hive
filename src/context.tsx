import React, { createContext, useContext, useCallback } from "react";
import { Store } from "./store";
import { Dispatch } from "./types";

const StoreContext = createContext<Store | null>(null);

export const StoreProvider: React.FC<{
	store: Store;
	children: React.ReactNode;
}> = ({ store, children }) => (
	<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
);

export function useStore<S = any>(): Store<S> {
	const store = useContext(StoreContext);
	if (!store) {
		throw new Error("useStore must be used within a StoreProvider");
	}
	return store as Store<S>;
}

export function useDispatch(): Dispatch {
	const store = useStore();
	return useCallback(store.dispatch, [store]);
}

export function useSelector<TSelected>(
	selector: (state: any) => TSelected,
): TSelected {
	const store = useContext(StoreContext);
	if (!store) {
		throw new Error("useSelector must be used within a StoreProvider");
	}
	return selector(store.getState());
}
