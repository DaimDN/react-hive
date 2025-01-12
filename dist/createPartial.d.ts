import { Partial, Reducer } from "./types";
export declare function createPartial<S = any>(config: Partial<S>): {
    name: string;
    reducer: Reducer<S>;
    actions: {
        [key: string]: any;
    };
    selectors: {
        [key: string]: import("./types").Selector<S, any>;
    };
};
//# sourceMappingURL=createPartial.d.ts.map