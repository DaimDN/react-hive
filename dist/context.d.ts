import React from "react";
import { Store } from "../src/store";
import { Dispatch } from "../src/types";
export declare const StoreProvider: React.FC<{
	store: Store;
	children: React.ReactNode;
}>;
export declare function useStore<S = any>(): Store<S>;
export declare function useDispatch(): Dispatch;
export declare function useSelector<TSelected>(
	selector: (state: any) => TSelected,
): TSelected;
//# sourceMappingURL=context.d.ts.map
