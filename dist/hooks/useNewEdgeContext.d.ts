import { EdgeContextOptions } from 'edge-core-js';
export declare const useNewEdgeContext: ({ apiKey, appId, authServer, hideKeys, path, plugins }: EdgeContextOptions) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<import("edge-core-js").EdgeContext>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeContext, undefined> | undefined) => Promise<import("edge-core-js").EdgeContext>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeContext>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeContext, undefined> | undefined) => Promise<import("edge-core-js").EdgeContext>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<import("edge-core-js").EdgeContext>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeContext, undefined> | undefined) => Promise<import("edge-core-js").EdgeContext>;
} | {
    status: "success";
    data: import("edge-core-js").EdgeContext;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeContext>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeContext, undefined> | undefined) => Promise<import("edge-core-js").EdgeContext>;
};
