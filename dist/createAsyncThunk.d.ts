import { AsyncThunk } from "./types";
export declare function createAsyncThunk<P = void, R = any>(type: string, payloadCreator: (payload: P) => Promise<R>): (payload: P) => AsyncThunk<R>;
//# sourceMappingURL=createAsyncThunk.d.ts.map