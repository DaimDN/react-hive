import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { Store } from '../store/store';  // Ensure the correct path for your Store class
import { Dispatch, Selector } from '../type';  // Ensure the correct path for your types

// Create a context with the type Store<any> | undefined, to handle the case of not having a store
const StoreContext = createContext<Store<any> | undefined>(undefined);

// Define the props for the StoreProvider component
interface StoreProviderProps {
  store: Store<any>;
  children: ReactNode;  // Ensure children is typed as ReactNode
}

// Define the StoreProvider component
export const StoreProvider: React.FC<StoreProviderProps> = ({ store, children }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

// Custom hook to access the store
export function useStore<S = any>(): Store<S> {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return store as Store<S>;
}

// Custom hook to select state from the store
export function useSelector<S = any, R = any>(selector: Selector<S, R>): R {
  const store = useStore<S>();
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  React.useEffect(() => {
    return store.subscribe(() => forceUpdate());
  }, [store]);

  return selector(store.getState());
}

// Custom hook to dispatch actions
export function useDispatch(): Dispatch {
  const store = useStore();
  return useCallback(store.dispatch, [store]);
}
