import type { ActionCreatorsMapObject, Dispatch, NovaState, ActionCreator } from "../types";
export declare function useNova(): {
    state: any;
    dispatch: React.Dispatch<any>;
};
export declare function usePartial<T = any>(partialName: string): [T, Dispatch];
export declare function useSelector<TSelected = unknown>(selector: (state: NovaState) => TSelected, equalityFn?: (left: TSelected, right: TSelected) => boolean): TSelected;
type BoundActionCreator<A extends ActionCreator> = (...args: Parameters<A>) => ReturnType<Dispatch>;
type BoundActionCreators<T extends ActionCreatorsMapObject> = {
    [K in keyof T]: BoundActionCreator<T[K]>;
};
export declare function useActions<T extends ActionCreatorsMapObject>(actions: T | Array<T[keyof T]>): T extends Array<any> ? Array<BoundActionCreator<T[number]>> : BoundActionCreators<T>;
export {};
//# sourceMappingURL=hooks.d.ts.map