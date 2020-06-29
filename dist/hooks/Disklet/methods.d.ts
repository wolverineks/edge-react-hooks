import { Disklet } from 'disklet';
export declare const useWrite: <T>(storage: Disklet, { path, stringify }: {
    path: string;
    stringify?: ((data: T) => string) | undefined;
}) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<unknown>;
    reset: () => void;
    execute: (variables: {
        data: T;
    }, options?: import("react-query").MutateOptions<unknown, {
        data: T;
    }> | undefined) => Promise<unknown>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<unknown>;
    reset: () => void;
    execute: (variables: {
        data: T;
    }, options?: import("react-query").MutateOptions<unknown, {
        data: T;
    }> | undefined) => Promise<unknown>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<unknown>;
    reset: () => void;
    execute: (variables: {
        data: T;
    }, options?: import("react-query").MutateOptions<unknown, {
        data: T;
    }> | undefined) => Promise<unknown>;
} | {
    status: "success";
    data: unknown;
    error: undefined;
    promise: Promise<unknown>;
    reset: () => void;
    execute: (variables: {
        data: T;
    }, options?: import("react-query").MutateOptions<unknown, {
        data: T;
    }> | undefined) => Promise<unknown>;
};
export declare const useDelete: (storage: Disklet, { path }: {
    path: string;
}) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<unknown>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<unknown, undefined> | undefined) => Promise<unknown>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<unknown>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<unknown, undefined> | undefined) => Promise<unknown>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<unknown>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<unknown, undefined> | undefined) => Promise<unknown>;
} | {
    status: "success";
    data: unknown;
    error: undefined;
    promise: Promise<unknown>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<unknown, undefined> | undefined) => Promise<unknown>;
};
