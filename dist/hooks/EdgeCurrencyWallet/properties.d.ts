import { EdgeCurrencyCodeOptions, EdgeCurrencyWallet, EdgeGetTransactionsOptions, EdgeSpendInfo } from 'edge-core-js';
export declare const useEnabledTokens: (wallet: EdgeCurrencyWallet) => {
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
export declare const useTransactions: (wallet: EdgeCurrencyWallet, { options }: {
    options?: EdgeGetTransactionsOptions | undefined;
}) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<import("edge-core-js").EdgeTransaction[]>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeTransaction[], undefined> | undefined) => Promise<import("edge-core-js").EdgeTransaction[]>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeTransaction[]>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeTransaction[], undefined> | undefined) => Promise<import("edge-core-js").EdgeTransaction[]>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<import("edge-core-js").EdgeTransaction[]>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeTransaction[], undefined> | undefined) => Promise<import("edge-core-js").EdgeTransaction[]>;
} | {
    status: "success";
    data: import("edge-core-js").EdgeTransaction[];
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeTransaction[]>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeTransaction[], undefined> | undefined) => Promise<import("edge-core-js").EdgeTransaction[]>;
};
export declare const useTransactionCount: (wallet: EdgeCurrencyWallet, { options }: {
    options: EdgeGetTransactionsOptions;
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
export declare const useReceiveAddressAndEncodeUri: (wallet: EdgeCurrencyWallet, { nativeAmount, options }: {
    nativeAmount: string;
    options?: EdgeCurrencyCodeOptions | undefined;
}) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<{
        receiveAddress: import("edge-core-js").EdgeReceiveAddress;
        uri: string;
    }>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<{
        receiveAddress: import("edge-core-js").EdgeReceiveAddress;
        uri: string;
    }, undefined> | undefined) => Promise<{
        receiveAddress: import("edge-core-js").EdgeReceiveAddress;
        uri: string;
    }>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<{
        receiveAddress: import("edge-core-js").EdgeReceiveAddress;
        uri: string;
    }>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<{
        receiveAddress: import("edge-core-js").EdgeReceiveAddress;
        uri: string;
    }, undefined> | undefined) => Promise<{
        receiveAddress: import("edge-core-js").EdgeReceiveAddress;
        uri: string;
    }>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<{
        receiveAddress: import("edge-core-js").EdgeReceiveAddress;
        uri: string;
    }>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<{
        receiveAddress: import("edge-core-js").EdgeReceiveAddress;
        uri: string;
    }, undefined> | undefined) => Promise<{
        receiveAddress: import("edge-core-js").EdgeReceiveAddress;
        uri: string;
    }>;
} | {
    status: "success";
    data: {
        receiveAddress: import("edge-core-js").EdgeReceiveAddress;
        uri: string;
    };
    error: undefined;
    promise: Promise<{
        receiveAddress: import("edge-core-js").EdgeReceiveAddress;
        uri: string;
    }>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<{
        receiveAddress: import("edge-core-js").EdgeReceiveAddress;
        uri: string;
    }, undefined> | undefined) => Promise<{
        receiveAddress: import("edge-core-js").EdgeReceiveAddress;
        uri: string;
    }>;
};
export declare const usePaymentProtocolInfo: (wallet: EdgeCurrencyWallet, { uri }: {
    uri: string;
}) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<import("edge-core-js").EdgePaymentProtocolInfo>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgePaymentProtocolInfo, undefined> | undefined) => Promise<import("edge-core-js").EdgePaymentProtocolInfo>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgePaymentProtocolInfo>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgePaymentProtocolInfo, undefined> | undefined) => Promise<import("edge-core-js").EdgePaymentProtocolInfo>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<import("edge-core-js").EdgePaymentProtocolInfo>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgePaymentProtocolInfo, undefined> | undefined) => Promise<import("edge-core-js").EdgePaymentProtocolInfo>;
} | {
    status: "success";
    data: import("edge-core-js").EdgePaymentProtocolInfo;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgePaymentProtocolInfo>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgePaymentProtocolInfo, undefined> | undefined) => Promise<import("edge-core-js").EdgePaymentProtocolInfo>;
};
export declare const useParsedUri: (wallet: EdgeCurrencyWallet, { uri, currencyCode }: {
    uri: string;
    currencyCode?: string | undefined;
}) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<import("edge-core-js").EdgeParsedUri>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeParsedUri, undefined> | undefined) => Promise<import("edge-core-js").EdgeParsedUri>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeParsedUri>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeParsedUri, undefined> | undefined) => Promise<import("edge-core-js").EdgeParsedUri>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<import("edge-core-js").EdgeParsedUri>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeParsedUri, undefined> | undefined) => Promise<import("edge-core-js").EdgeParsedUri>;
} | {
    status: "success";
    data: import("edge-core-js").EdgeParsedUri;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeParsedUri>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeParsedUri, undefined> | undefined) => Promise<import("edge-core-js").EdgeParsedUri>;
};
export declare const useNativeToDenomination: (wallet: EdgeCurrencyWallet, { nativeAmount, currencyCode }: {
    nativeAmount: string;
    currencyCode: string;
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
export declare const useDenominationToNative: (wallet: EdgeCurrencyWallet, { denomimatedAmount, currencyCode }: {
    denomimatedAmount: string;
    currencyCode: string;
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
export declare const useNewTransaction: (wallet: EdgeCurrencyWallet, { spendInfo }: {
    spendInfo: EdgeSpendInfo;
}) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<import("edge-core-js").EdgeTransaction>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeTransaction, undefined> | undefined) => Promise<import("edge-core-js").EdgeTransaction>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeTransaction>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeTransaction, undefined> | undefined) => Promise<import("edge-core-js").EdgeTransaction>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<import("edge-core-js").EdgeTransaction>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeTransaction, undefined> | undefined) => Promise<import("edge-core-js").EdgeTransaction>;
} | {
    status: "success";
    data: import("edge-core-js").EdgeTransaction;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeTransaction>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeTransaction, undefined> | undefined) => Promise<import("edge-core-js").EdgeTransaction>;
};
export declare const useSweepTransaction: (wallet: EdgeCurrencyWallet, { spendInfo }: {
    spendInfo: EdgeSpendInfo;
}) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<import("edge-core-js").EdgeTransaction>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeTransaction, undefined> | undefined) => Promise<import("edge-core-js").EdgeTransaction>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeTransaction>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeTransaction, undefined> | undefined) => Promise<import("edge-core-js").EdgeTransaction>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<import("edge-core-js").EdgeTransaction>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeTransaction, undefined> | undefined) => Promise<import("edge-core-js").EdgeTransaction>;
} | {
    status: "success";
    data: import("edge-core-js").EdgeTransaction;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeTransaction>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeTransaction, undefined> | undefined) => Promise<import("edge-core-js").EdgeTransaction>;
};
export declare const useMaxSpendable: (wallet: EdgeCurrencyWallet, { spendInfo }: {
    spendInfo: EdgeSpendInfo;
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
