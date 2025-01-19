import type { Partial, Store } from "../types";
export declare function combinePartials<S extends {
    [key: string]: any;
}>(partials: Array<Partial<S[keyof S]>>): Store<S>;
//# sourceMappingURL=combinePartials.d.ts.map