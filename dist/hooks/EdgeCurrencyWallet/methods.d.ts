import { EdgeCurrencyWallet, EdgeGetTransactionsOptions, EdgeMetadata, EdgeReceiveAddress, EdgeTokenInfo, EdgeTransaction } from 'edge-core-js';
export declare const useStopEngine: (wallet: EdgeCurrencyWallet) => {
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
export declare const useStartEngine: (wallet: EdgeCurrencyWallet) => {
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
export declare const useResyncBlockchain: (wallet: EdgeCurrencyWallet) => {
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
export declare const useDumpData: (wallet: EdgeCurrencyWallet) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<import("edge-core-js").EdgeDataDump>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeDataDump, undefined> | undefined) => Promise<import("edge-core-js").EdgeDataDump>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeDataDump>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeDataDump, undefined> | undefined) => Promise<import("edge-core-js").EdgeDataDump>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<import("edge-core-js").EdgeDataDump>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeDataDump, undefined> | undefined) => Promise<import("edge-core-js").EdgeDataDump>;
} | {
    status: "success";
    data: import("edge-core-js").EdgeDataDump;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeDataDump>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeDataDump, undefined> | undefined) => Promise<import("edge-core-js").EdgeDataDump>;
};
export declare const useSignTransaction: (wallet: EdgeCurrencyWallet) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<EdgeTransaction>;
    reset: () => void;
    execute: (variables: {
        transaction: EdgeTransaction;
    }, options?: import("react-query").MutateOptions<EdgeTransaction, {
        transaction: EdgeTransaction;
    }> | undefined) => Promise<EdgeTransaction>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<EdgeTransaction>;
    reset: () => void;
    execute: (variables: {
        transaction: EdgeTransaction;
    }, options?: import("react-query").MutateOptions<EdgeTransaction, {
        transaction: EdgeTransaction;
    }> | undefined) => Promise<EdgeTransaction>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<EdgeTransaction>;
    reset: () => void;
    execute: (variables: {
        transaction: EdgeTransaction;
    }, options?: import("react-query").MutateOptions<EdgeTransaction, {
        transaction: EdgeTransaction;
    }> | undefined) => Promise<EdgeTransaction>;
} | {
    status: "success";
    data: EdgeTransaction;
    error: undefined;
    promise: Promise<EdgeTransaction>;
    reset: () => void;
    execute: (variables: {
        transaction: EdgeTransaction;
    }, options?: import("react-query").MutateOptions<EdgeTransaction, {
        transaction: EdgeTransaction;
    }> | undefined) => Promise<EdgeTransaction>;
};
export declare const useBroadcastTransaction: (wallet: EdgeCurrencyWallet) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<EdgeTransaction>;
    reset: () => void;
    execute: (variables: {
        transaction: EdgeTransaction;
    }, options?: import("react-query").MutateOptions<EdgeTransaction, {
        transaction: EdgeTransaction;
    }> | undefined) => Promise<EdgeTransaction>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<EdgeTransaction>;
    reset: () => void;
    execute: (variables: {
        transaction: EdgeTransaction;
    }, options?: import("react-query").MutateOptions<EdgeTransaction, {
        transaction: EdgeTransaction;
    }> | undefined) => Promise<EdgeTransaction>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<EdgeTransaction>;
    reset: () => void;
    execute: (variables: {
        transaction: EdgeTransaction;
    }, options?: import("react-query").MutateOptions<EdgeTransaction, {
        transaction: EdgeTransaction;
    }> | undefined) => Promise<EdgeTransaction>;
} | {
    status: "success";
    data: EdgeTransaction;
    error: undefined;
    promise: Promise<EdgeTransaction>;
    reset: () => void;
    execute: (variables: {
        transaction: EdgeTransaction;
    }, options?: import("react-query").MutateOptions<EdgeTransaction, {
        transaction: EdgeTransaction;
    }> | undefined) => Promise<EdgeTransaction>;
};
export declare const useSaveTransaction: (wallet: EdgeCurrencyWallet) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        transaction: EdgeTransaction;
    }, options?: import("react-query").MutateOptions<void, {
        transaction: EdgeTransaction;
    }> | undefined) => Promise<void>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        transaction: EdgeTransaction;
    }, options?: import("react-query").MutateOptions<void, {
        transaction: EdgeTransaction;
    }> | undefined) => Promise<void>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        transaction: EdgeTransaction;
    }, options?: import("react-query").MutateOptions<void, {
        transaction: EdgeTransaction;
    }> | undefined) => Promise<void>;
} | {
    status: "success";
    data: void;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        transaction: EdgeTransaction;
    }, options?: import("react-query").MutateOptions<void, {
        transaction: EdgeTransaction;
    }> | undefined) => Promise<void>;
};
export declare const useSignBroadcastAndSaveTransaction: (wallet: EdgeCurrencyWallet) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        transaction: EdgeTransaction;
    }, options?: import("react-query").MutateOptions<void, {
        transaction: EdgeTransaction;
    }> | undefined) => Promise<void>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        transaction: EdgeTransaction;
    }, options?: import("react-query").MutateOptions<void, {
        transaction: EdgeTransaction;
    }> | undefined) => Promise<void>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        transaction: EdgeTransaction;
    }, options?: import("react-query").MutateOptions<void, {
        transaction: EdgeTransaction;
    }> | undefined) => Promise<void>;
} | {
    status: "success";
    data: void;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        transaction: EdgeTransaction;
    }, options?: import("react-query").MutateOptions<void, {
        transaction: EdgeTransaction;
    }> | undefined) => Promise<void>;
};
export declare const useAddCustomToken: (wallet: EdgeCurrencyWallet) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        tokenInfo: EdgeTokenInfo;
    }, options?: import("react-query").MutateOptions<void, {
        tokenInfo: EdgeTokenInfo;
    }> | undefined) => Promise<void>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        tokenInfo: EdgeTokenInfo;
    }, options?: import("react-query").MutateOptions<void, {
        tokenInfo: EdgeTokenInfo;
    }> | undefined) => Promise<void>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        tokenInfo: EdgeTokenInfo;
    }, options?: import("react-query").MutateOptions<void, {
        tokenInfo: EdgeTokenInfo;
    }> | undefined) => Promise<void>;
} | {
    status: "success";
    data: void;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        tokenInfo: EdgeTokenInfo;
    }, options?: import("react-query").MutateOptions<void, {
        tokenInfo: EdgeTokenInfo;
    }> | undefined) => Promise<void>;
};
export declare const useEnableTokens: (wallet: EdgeCurrencyWallet) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        tokens: string[];
    }, options?: import("react-query").MutateOptions<void, {
        tokens: string[];
    }> | undefined) => Promise<void>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        tokens: string[];
    }, options?: import("react-query").MutateOptions<void, {
        tokens: string[];
    }> | undefined) => Promise<void>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        tokens: string[];
    }, options?: import("react-query").MutateOptions<void, {
        tokens: string[];
    }> | undefined) => Promise<void>;
} | {
    status: "success";
    data: void;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        tokens: string[];
    }, options?: import("react-query").MutateOptions<void, {
        tokens: string[];
    }> | undefined) => Promise<void>;
};
export declare const useDisableTokens: (wallet: EdgeCurrencyWallet) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        tokens: string[];
    }, options?: import("react-query").MutateOptions<void, {
        tokens: string[];
    }> | undefined) => Promise<void>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        tokens: string[];
    }, options?: import("react-query").MutateOptions<void, {
        tokens: string[];
    }> | undefined) => Promise<void>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        tokens: string[];
    }, options?: import("react-query").MutateOptions<void, {
        tokens: string[];
    }> | undefined) => Promise<void>;
} | {
    status: "success";
    data: void;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        tokens: string[];
    }, options?: import("react-query").MutateOptions<void, {
        tokens: string[];
    }> | undefined) => Promise<void>;
};
export declare const useSaveReceiveAddress: (wallet: EdgeCurrencyWallet) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        receiveAddress: EdgeReceiveAddress;
    }, options?: import("react-query").MutateOptions<void, {
        receiveAddress: EdgeReceiveAddress;
    }> | undefined) => Promise<void>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        receiveAddress: EdgeReceiveAddress;
    }, options?: import("react-query").MutateOptions<void, {
        receiveAddress: EdgeReceiveAddress;
    }> | undefined) => Promise<void>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        receiveAddress: EdgeReceiveAddress;
    }, options?: import("react-query").MutateOptions<void, {
        receiveAddress: EdgeReceiveAddress;
    }> | undefined) => Promise<void>;
} | {
    status: "success";
    data: void;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        receiveAddress: EdgeReceiveAddress;
    }, options?: import("react-query").MutateOptions<void, {
        receiveAddress: EdgeReceiveAddress;
    }> | undefined) => Promise<void>;
};
export declare const useLockReceiveAddress: (wallet: EdgeCurrencyWallet) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        receiveAddress: EdgeReceiveAddress;
    }, options?: import("react-query").MutateOptions<void, {
        receiveAddress: EdgeReceiveAddress;
    }> | undefined) => Promise<void>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        receiveAddress: EdgeReceiveAddress;
    }, options?: import("react-query").MutateOptions<void, {
        receiveAddress: EdgeReceiveAddress;
    }> | undefined) => Promise<void>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        receiveAddress: EdgeReceiveAddress;
    }, options?: import("react-query").MutateOptions<void, {
        receiveAddress: EdgeReceiveAddress;
    }> | undefined) => Promise<void>;
} | {
    status: "success";
    data: void;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        receiveAddress: EdgeReceiveAddress;
    }, options?: import("react-query").MutateOptions<void, {
        receiveAddress: EdgeReceiveAddress;
    }> | undefined) => Promise<void>;
};
export declare const useExportTransactionsToQBO: (wallet: EdgeCurrencyWallet) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables: {
        options: EdgeGetTransactionsOptions;
    }, options?: import("react-query").MutateOptions<string, {
        options: EdgeGetTransactionsOptions;
    }> | undefined) => Promise<string>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables: {
        options: EdgeGetTransactionsOptions;
    }, options?: import("react-query").MutateOptions<string, {
        options: EdgeGetTransactionsOptions;
    }> | undefined) => Promise<string>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables: {
        options: EdgeGetTransactionsOptions;
    }, options?: import("react-query").MutateOptions<string, {
        options: EdgeGetTransactionsOptions;
    }> | undefined) => Promise<string>;
} | {
    status: "success";
    data: string;
    error: undefined;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables: {
        options: EdgeGetTransactionsOptions;
    }, options?: import("react-query").MutateOptions<string, {
        options: EdgeGetTransactionsOptions;
    }> | undefined) => Promise<string>;
};
export declare const useExportTransactionsToCSV: (wallet: EdgeCurrencyWallet) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables: {
        options: EdgeGetTransactionsOptions;
    }, options?: import("react-query").MutateOptions<string, {
        options: EdgeGetTransactionsOptions;
    }> | undefined) => Promise<string>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables: {
        options: EdgeGetTransactionsOptions;
    }, options?: import("react-query").MutateOptions<string, {
        options: EdgeGetTransactionsOptions;
    }> | undefined) => Promise<string>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables: {
        options: EdgeGetTransactionsOptions;
    }, options?: import("react-query").MutateOptions<string, {
        options: EdgeGetTransactionsOptions;
    }> | undefined) => Promise<string>;
} | {
    status: "success";
    data: string;
    error: undefined;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables: {
        options: EdgeGetTransactionsOptions;
    }, options?: import("react-query").MutateOptions<string, {
        options: EdgeGetTransactionsOptions;
    }> | undefined) => Promise<string>;
};
export declare const useSaveTransactionMetadata: (wallet: EdgeCurrencyWallet) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        txid: string;
        currencyCode: string;
        metadata: EdgeMetadata;
    }, options?: import("react-query").MutateOptions<void, {
        txid: string;
        currencyCode: string;
        metadata: EdgeMetadata;
    }> | undefined) => Promise<void>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        txid: string;
        currencyCode: string;
        metadata: EdgeMetadata;
    }, options?: import("react-query").MutateOptions<void, {
        txid: string;
        currencyCode: string;
        metadata: EdgeMetadata;
    }> | undefined) => Promise<void>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        txid: string;
        currencyCode: string;
        metadata: EdgeMetadata;
    }, options?: import("react-query").MutateOptions<void, {
        txid: string;
        currencyCode: string;
        metadata: EdgeMetadata;
    }> | undefined) => Promise<void>;
} | {
    status: "success";
    data: void;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        txid: string;
        currencyCode: string;
        metadata: EdgeMetadata;
    }, options?: import("react-query").MutateOptions<void, {
        txid: string;
        currencyCode: string;
        metadata: EdgeMetadata;
    }> | undefined) => Promise<void>;
};
export declare const useRenameWallet: (wallet: EdgeCurrencyWallet) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        name: string;
    }, options?: import("react-query").MutateOptions<void, {
        name: string;
    }> | undefined) => Promise<void>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        name: string;
    }, options?: import("react-query").MutateOptions<void, {
        name: string;
    }> | undefined) => Promise<void>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        name: string;
    }, options?: import("react-query").MutateOptions<void, {
        name: string;
    }> | undefined) => Promise<void>;
} | {
    status: "success";
    data: void;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        name: string;
    }, options?: import("react-query").MutateOptions<void, {
        name: string;
    }> | undefined) => Promise<void>;
};
export declare const useSetFiatCurrencyCode: (wallet: EdgeCurrencyWallet) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        fiatCurrencyCode: string;
    }, options?: import("react-query").MutateOptions<void, {
        fiatCurrencyCode: string;
    }> | undefined) => Promise<void>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        fiatCurrencyCode: string;
    }, options?: import("react-query").MutateOptions<void, {
        fiatCurrencyCode: string;
    }> | undefined) => Promise<void>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        fiatCurrencyCode: string;
    }, options?: import("react-query").MutateOptions<void, {
        fiatCurrencyCode: string;
    }> | undefined) => Promise<void>;
} | {
    status: "success";
    data: void;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        fiatCurrencyCode: string;
    }, options?: import("react-query").MutateOptions<void, {
        fiatCurrencyCode: string;
    }> | undefined) => Promise<void>;
};
