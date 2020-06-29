import { EdgeAccount, EdgeCurrencyWallet } from 'edge-core-js';
declare type Syncable = EdgeAccount | EdgeCurrencyWallet;
export declare const useSync: (syncable: Syncable) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<void, undefined> | undefined) => Promise<void>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<void, undefined> | undefined) => Promise<void>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<void, undefined> | undefined) => Promise<void>;
} | {
    status: "success";
    data: void;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<void, undefined> | undefined) => Promise<void>;
};
export {};
