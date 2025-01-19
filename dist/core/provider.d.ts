import * as React from "react";
type NovaContextType = {
    state: any;
    dispatch: React.Dispatch<any>;
};
export declare const NovaContext: React.Context<NovaContextType | null>;
type Store = {
    initialState: any;
    reducer: React.Reducer<any, any>;
};
type NovaProviderProps = {
    children: React.ReactNode;
    store: Store;
};
export declare function NovaProvider({ children, store }: NovaProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=provider.d.ts.map