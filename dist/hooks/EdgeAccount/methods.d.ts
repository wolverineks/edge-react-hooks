import { EdgeAccount, EdgeCreateCurrencyWalletOptions, EdgeWalletState, EdgeWalletStates, EthereumTransaction, JsonObject } from 'edge-core-js';
export declare const useEnableOtp: (account: EdgeAccount) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        timeout?: number | undefined;
    }, options?: import("react-query").MutateOptions<void, {
        timeout?: number | undefined;
    }> | undefined) => Promise<void>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        timeout?: number | undefined;
    }, options?: import("react-query").MutateOptions<void, {
        timeout?: number | undefined;
    }> | undefined) => Promise<void>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        timeout?: number | undefined;
    }, options?: import("react-query").MutateOptions<void, {
        timeout?: number | undefined;
    }> | undefined) => Promise<void>;
} | {
    status: "success";
    data: void;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        timeout?: number | undefined;
    }, options?: import("react-query").MutateOptions<void, {
        timeout?: number | undefined;
    }> | undefined) => Promise<void>;
};
export declare const useDisableOtp: (account: EdgeAccount) => {
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
export declare const useCancelOtpReset: (account: EdgeAccount) => {
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
export declare const useLogout: (account: EdgeAccount) => {
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
export declare const useChangeRecovery: (account: EdgeAccount) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables: {
        questions: string[];
        answers: string[];
    }, options?: import("react-query").MutateOptions<string, {
        questions: string[];
        answers: string[];
    }> | undefined) => Promise<string>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables: {
        questions: string[];
        answers: string[];
    }, options?: import("react-query").MutateOptions<string, {
        questions: string[];
        answers: string[];
    }> | undefined) => Promise<string>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables: {
        questions: string[];
        answers: string[];
    }, options?: import("react-query").MutateOptions<string, {
        questions: string[];
        answers: string[];
    }> | undefined) => Promise<string>;
} | {
    status: "success";
    data: string;
    error: undefined;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables: {
        questions: string[];
        answers: string[];
    }, options?: import("react-query").MutateOptions<string, {
        questions: string[];
        answers: string[];
    }> | undefined) => Promise<string>;
};
export declare const useDeleteRecovery: (account: EdgeAccount) => {
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
export declare const useChangePin: (account: EdgeAccount) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables: {
        options: {
            enableLogin?: boolean;
            pin?: string;
        };
    }, options?: import("react-query").MutateOptions<string, {
        options: {
            enableLogin?: boolean;
            pin?: string;
        };
    }> | undefined) => Promise<string>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables: {
        options: {
            enableLogin?: boolean;
            pin?: string;
        };
    }, options?: import("react-query").MutateOptions<string, {
        options: {
            enableLogin?: boolean;
            pin?: string;
        };
    }> | undefined) => Promise<string>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables: {
        options: {
            enableLogin?: boolean;
            pin?: string;
        };
    }, options?: import("react-query").MutateOptions<string, {
        options: {
            enableLogin?: boolean;
            pin?: string;
        };
    }> | undefined) => Promise<string>;
} | {
    status: "success";
    data: string;
    error: undefined;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables: {
        options: {
            enableLogin?: boolean;
            pin?: string;
        };
    }, options?: import("react-query").MutateOptions<string, {
        options: {
            enableLogin?: boolean;
            pin?: string;
        };
    }> | undefined) => Promise<string>;
};
export declare const useDeletePin: (account: EdgeAccount) => {
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
export declare const useDeletePassword: (account: EdgeAccount) => {
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
export declare const useChangePassword: (account: EdgeAccount) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        password: string;
    }, options?: import("react-query").MutateOptions<void, {
        password: string;
    }> | undefined) => Promise<void>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        password: string;
    }, options?: import("react-query").MutateOptions<void, {
        password: string;
    }> | undefined) => Promise<void>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        password: string;
    }, options?: import("react-query").MutateOptions<void, {
        password: string;
    }> | undefined) => Promise<void>;
} | {
    status: "success";
    data: void;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        password: string;
    }, options?: import("react-query").MutateOptions<void, {
        password: string;
    }> | undefined) => Promise<void>;
};
export declare const useSignEthereumTransaction: (account: EdgeAccount) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables: {
        walletId: string;
        transaction: EthereumTransaction;
    }, options?: import("react-query").MutateOptions<string, {
        walletId: string;
        transaction: EthereumTransaction;
    }> | undefined) => Promise<string>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables: {
        walletId: string;
        transaction: EthereumTransaction;
    }, options?: import("react-query").MutateOptions<string, {
        walletId: string;
        transaction: EthereumTransaction;
    }> | undefined) => Promise<string>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables: {
        walletId: string;
        transaction: EthereumTransaction;
    }, options?: import("react-query").MutateOptions<string, {
        walletId: string;
        transaction: EthereumTransaction;
    }> | undefined) => Promise<string>;
} | {
    status: "success";
    data: string;
    error: undefined;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables: {
        walletId: string;
        transaction: EthereumTransaction;
    }, options?: import("react-query").MutateOptions<string, {
        walletId: string;
        transaction: EthereumTransaction;
    }> | undefined) => Promise<string>;
};
export declare const useCreateWallet: (account: EdgeAccount) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables: {
        type: string;
        keys?: JsonObject | undefined;
    }, options?: import("react-query").MutateOptions<string, {
        type: string;
        keys?: JsonObject | undefined;
    }> | undefined) => Promise<string>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables: {
        type: string;
        keys?: JsonObject | undefined;
    }, options?: import("react-query").MutateOptions<string, {
        type: string;
        keys?: JsonObject | undefined;
    }> | undefined) => Promise<string>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables: {
        type: string;
        keys?: JsonObject | undefined;
    }, options?: import("react-query").MutateOptions<string, {
        type: string;
        keys?: JsonObject | undefined;
    }> | undefined) => Promise<string>;
} | {
    status: "success";
    data: string;
    error: undefined;
    promise: Promise<string>;
    reset: () => void;
    execute: (variables: {
        type: string;
        keys?: JsonObject | undefined;
    }, options?: import("react-query").MutateOptions<string, {
        type: string;
        keys?: JsonObject | undefined;
    }> | undefined) => Promise<string>;
};
export declare const useCreateCurrencyWallet: (account: EdgeAccount) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<import("edge-core-js").EdgeCurrencyWallet>;
    reset: () => void;
    execute: (variables: {
        type: string;
        options: EdgeCreateCurrencyWalletOptions;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeCurrencyWallet, {
        type: string;
        options: EdgeCreateCurrencyWalletOptions;
    }> | undefined) => Promise<import("edge-core-js").EdgeCurrencyWallet>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeCurrencyWallet>;
    reset: () => void;
    execute: (variables: {
        type: string;
        options: EdgeCreateCurrencyWalletOptions;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeCurrencyWallet, {
        type: string;
        options: EdgeCreateCurrencyWalletOptions;
    }> | undefined) => Promise<import("edge-core-js").EdgeCurrencyWallet>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<import("edge-core-js").EdgeCurrencyWallet>;
    reset: () => void;
    execute: (variables: {
        type: string;
        options: EdgeCreateCurrencyWalletOptions;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeCurrencyWallet, {
        type: string;
        options: EdgeCreateCurrencyWalletOptions;
    }> | undefined) => Promise<import("edge-core-js").EdgeCurrencyWallet>;
} | {
    status: "success";
    data: import("edge-core-js").EdgeCurrencyWallet;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeCurrencyWallet>;
    reset: () => void;
    execute: (variables: {
        type: string;
        options: EdgeCreateCurrencyWalletOptions;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeCurrencyWallet, {
        type: string;
        options: EdgeCreateCurrencyWalletOptions;
    }> | undefined) => Promise<import("edge-core-js").EdgeCurrencyWallet>;
};
export declare const useChangeWalletStates: (account: EdgeAccount) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        walletStates: EdgeWalletStates;
    }, options?: import("react-query").MutateOptions<void, {
        walletStates: EdgeWalletStates;
    }> | undefined) => Promise<void>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        walletStates: EdgeWalletStates;
    }, options?: import("react-query").MutateOptions<void, {
        walletStates: EdgeWalletStates;
    }> | undefined) => Promise<void>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        walletStates: EdgeWalletStates;
    }, options?: import("react-query").MutateOptions<void, {
        walletStates: EdgeWalletStates;
    }> | undefined) => Promise<void>;
} | {
    status: "success";
    data: void;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        walletStates: EdgeWalletStates;
    }, options?: import("react-query").MutateOptions<void, {
        walletStates: EdgeWalletStates;
    }> | undefined) => Promise<void>;
};
export declare const useChangeWalletState: (account: EdgeAccount) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        walletId: string;
        walletState: EdgeWalletState;
    }, options?: import("react-query").MutateOptions<void, {
        walletId: string;
        walletState: EdgeWalletState;
    }> | undefined) => Promise<void>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        walletId: string;
        walletState: EdgeWalletState;
    }, options?: import("react-query").MutateOptions<void, {
        walletId: string;
        walletState: EdgeWalletState;
    }> | undefined) => Promise<void>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        walletId: string;
        walletState: EdgeWalletState;
    }, options?: import("react-query").MutateOptions<void, {
        walletId: string;
        walletState: EdgeWalletState;
    }> | undefined) => Promise<void>;
} | {
    status: "success";
    data: void;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        walletId: string;
        walletState: EdgeWalletState;
    }, options?: import("react-query").MutateOptions<void, {
        walletId: string;
        walletState: EdgeWalletState;
    }> | undefined) => Promise<void>;
};
