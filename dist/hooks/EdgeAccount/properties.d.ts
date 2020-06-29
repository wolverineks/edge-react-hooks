import { EdgeAccount, EdgeConvertCurrencyOpts, EdgeRateCache, EdgeSwapRequest, EdgeSwapRequestOptions } from 'edge-core-js';
export declare const useSwapQuote: (account: EdgeAccount, { request, options }: {
    request: EdgeSwapRequest;
    options: EdgeSwapRequestOptions;
}) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<import("edge-core-js").EdgeSwapQuote>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeSwapQuote, undefined> | undefined) => Promise<import("edge-core-js").EdgeSwapQuote>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeSwapQuote>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeSwapQuote, undefined> | undefined) => Promise<import("edge-core-js").EdgeSwapQuote>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<import("edge-core-js").EdgeSwapQuote>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeSwapQuote, undefined> | undefined) => Promise<import("edge-core-js").EdgeSwapQuote>;
} | {
    status: "success";
    data: import("edge-core-js").EdgeSwapQuote;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeSwapQuote>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeSwapQuote, undefined> | undefined) => Promise<import("edge-core-js").EdgeSwapQuote>;
};
export declare const useSplittableWalletTypes: (account: EdgeAccount, { walletId }: {
    walletId: string;
}) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<string[]>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<string[], undefined> | undefined) => Promise<string[]>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<string[]>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<string[], undefined> | undefined) => Promise<string[]>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<string[]>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<string[], undefined> | undefined) => Promise<string[]>;
} | {
    status: "success";
    data: string[];
    error: undefined;
    promise: Promise<string[]>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<string[], undefined> | undefined) => Promise<string[]>;
};
export declare const useWaitForCurrencyWallet: (account: EdgeAccount, { walletId }: {
    walletId: string;
}) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<import("edge-core-js").EdgeCurrencyWallet>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeCurrencyWallet, undefined> | undefined) => Promise<import("edge-core-js").EdgeCurrencyWallet>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeCurrencyWallet>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeCurrencyWallet, undefined> | undefined) => Promise<import("edge-core-js").EdgeCurrencyWallet>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<import("edge-core-js").EdgeCurrencyWallet>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeCurrencyWallet, undefined> | undefined) => Promise<import("edge-core-js").EdgeCurrencyWallet>;
} | {
    status: "success";
    data: import("edge-core-js").EdgeCurrencyWallet;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeCurrencyWallet>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeCurrencyWallet, undefined> | undefined) => Promise<import("edge-core-js").EdgeCurrencyWallet>;
};
export declare const useSplitWalletInfo: (account: EdgeAccount, { walletId, newWalletType }: {
    walletId: string;
    newWalletType: string;
}) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<string, undefined> | undefined) => Promise<string>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<string, undefined> | undefined) => Promise<string>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<string, undefined> | undefined) => Promise<string>;
} | {
    status: "success";
    data: string;
    error: undefined;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<string, undefined> | undefined) => Promise<string>;
};
export declare const useLobby: (account: EdgeAccount, { lobbyId }: {
    lobbyId: string;
}) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<import("edge-core-js").EdgeLobby>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeLobby, undefined> | undefined) => Promise<import("edge-core-js").EdgeLobby>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeLobby>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeLobby, undefined> | undefined) => Promise<import("edge-core-js").EdgeLobby>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<import("edge-core-js").EdgeLobby>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeLobby, undefined> | undefined) => Promise<import("edge-core-js").EdgeLobby>;
} | {
    status: "success";
    data: import("edge-core-js").EdgeLobby;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeLobby>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeLobby, undefined> | undefined) => Promise<import("edge-core-js").EdgeLobby>;
};
export declare const useConvertCurrency: (rateCache: EdgeRateCache, { fromCurrency, toCurrency, amount, options, }: {
    fromCurrency: string;
    toCurrency: string;
    amount?: number | undefined;
    options?: EdgeConvertCurrencyOpts | undefined;
}) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<number>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<number, undefined> | undefined) => Promise<number>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<number>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<number, undefined> | undefined) => Promise<number>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<number>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<number, undefined> | undefined) => Promise<number>;
} | {
    status: "success";
    data: number;
    error: undefined;
    promise: Promise<number>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<number, undefined> | undefined) => Promise<number>;
};
export declare const useVerifyPin: (account: EdgeAccount, { pin }: {
    pin: string;
}) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<boolean>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<boolean, undefined> | undefined) => Promise<boolean>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<boolean>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<boolean, undefined> | undefined) => Promise<boolean>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<boolean>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<boolean, undefined> | undefined) => Promise<boolean>;
} | {
    status: "success";
    data: boolean;
    error: undefined;
    promise: Promise<boolean>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<boolean, undefined> | undefined) => Promise<boolean>;
};
export declare const useVerifyPassword: (account: EdgeAccount, { password }: {
    password: string;
}) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<boolean>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<boolean, undefined> | undefined) => Promise<boolean>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<boolean>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<boolean, undefined> | undefined) => Promise<boolean>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<boolean>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<boolean, undefined> | undefined) => Promise<boolean>;
} | {
    status: "success";
    data: boolean;
    error: undefined;
    promise: Promise<boolean>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<boolean, undefined> | undefined) => Promise<boolean>;
};
