import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { Store } from '../store/store';
import { Dispatch, Selector } from '../type';

const StoreContext = createContext<Store<any> | undefined>(undefined);

interface StoreProviderProps {
  store: Store<any>;
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ store, children }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export function useStore<S = any>(): Store<S> {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return store as Store<S>;
}

export function useSelector<S = any, R = any>(selector: Selector<S, R>): R {
  const store = useStore<S>();
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  React.useEffect(() => {
    return store.subscribe(() => forceUpdate());
  }, [store]);

  return selector(store.getState());
}

export function useDispatch(): Dispatch {
  const store = useStore();
  return useCallback(store.dispatch, [store]);
}
