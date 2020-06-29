import { EdgeAccountOptions, EdgeContext, EdgeEdgeLoginOptions } from 'edge-core-js';
export declare const useClose: (context: EdgeContext) => {
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
export declare const useCreateAccount: (context: EdgeContext) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<import("edge-core-js").EdgeAccount>;
    reset: () => void;
    execute: (variables: {
        username: string;
        password: string;
        pin: string;
        options?: EdgeAccountOptions | undefined;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeAccount, {
        username: string;
        password: string;
        pin: string;
        options?: EdgeAccountOptions | undefined;
    }> | undefined) => Promise<import("edge-core-js").EdgeAccount>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeAccount>;
    reset: () => void;
    execute: (variables: {
        username: string;
        password: string;
        pin: string;
        options?: EdgeAccountOptions | undefined;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeAccount, {
        username: string;
        password: string;
        pin: string;
        options?: EdgeAccountOptions | undefined;
    }> | undefined) => Promise<import("edge-core-js").EdgeAccount>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<import("edge-core-js").EdgeAccount>;
    reset: () => void;
    execute: (variables: {
        username: string;
        password: string;
        pin: string;
        options?: EdgeAccountOptions | undefined;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeAccount, {
        username: string;
        password: string;
        pin: string;
        options?: EdgeAccountOptions | undefined;
    }> | undefined) => Promise<import("edge-core-js").EdgeAccount>;
} | {
    status: "success";
    data: import("edge-core-js").EdgeAccount;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeAccount>;
    reset: () => void;
    execute: (variables: {
        username: string;
        password: string;
        pin: string;
        options?: EdgeAccountOptions | undefined;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeAccount, {
        username: string;
        password: string;
        pin: string;
        options?: EdgeAccountOptions | undefined;
    }> | undefined) => Promise<import("edge-core-js").EdgeAccount>;
};
export declare const useLoginWithKey: (context: EdgeContext) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<import("edge-core-js").EdgeAccount>;
    reset: () => void;
    execute: (variables: {
        username: string;
        loginKey: string;
        options?: EdgeAccountOptions | undefined;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeAccount, {
        username: string;
        loginKey: string;
        options?: EdgeAccountOptions | undefined;
    }> | undefined) => Promise<import("edge-core-js").EdgeAccount>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeAccount>;
    reset: () => void;
    execute: (variables: {
        username: string;
        loginKey: string;
        options?: EdgeAccountOptions | undefined;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeAccount, {
        username: string;
        loginKey: string;
        options?: EdgeAccountOptions | undefined;
    }> | undefined) => Promise<import("edge-core-js").EdgeAccount>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<import("edge-core-js").EdgeAccount>;
    reset: () => void;
    execute: (variables: {
        username: string;
        loginKey: string;
        options?: EdgeAccountOptions | undefined;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeAccount, {
        username: string;
        loginKey: string;
        options?: EdgeAccountOptions | undefined;
    }> | undefined) => Promise<import("edge-core-js").EdgeAccount>;
} | {
    status: "success";
    data: import("edge-core-js").EdgeAccount;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeAccount>;
    reset: () => void;
    execute: (variables: {
        username: string;
        loginKey: string;
        options?: EdgeAccountOptions | undefined;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeAccount, {
        username: string;
        loginKey: string;
        options?: EdgeAccountOptions | undefined;
    }> | undefined) => Promise<import("edge-core-js").EdgeAccount>;
};
export declare const useLoginWithPassword: (context: EdgeContext) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<import("edge-core-js").EdgeAccount>;
    reset: () => void;
    execute: (variables: {
        username: string;
        password: string;
        options?: EdgeAccountOptions | undefined;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeAccount, {
        username: string;
        password: string;
        options?: EdgeAccountOptions | undefined;
    }> | undefined) => Promise<import("edge-core-js").EdgeAccount>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeAccount>;
    reset: () => void;
    execute: (variables: {
        username: string;
        password: string;
        options?: EdgeAccountOptions | undefined;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeAccount, {
        username: string;
        password: string;
        options?: EdgeAccountOptions | undefined;
    }> | undefined) => Promise<import("edge-core-js").EdgeAccount>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<import("edge-core-js").EdgeAccount>;
    reset: () => void;
    execute: (variables: {
        username: string;
        password: string;
        options?: EdgeAccountOptions | undefined;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeAccount, {
        username: string;
        password: string;
        options?: EdgeAccountOptions | undefined;
    }> | undefined) => Promise<import("edge-core-js").EdgeAccount>;
} | {
    status: "success";
    data: import("edge-core-js").EdgeAccount;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeAccount>;
    reset: () => void;
    execute: (variables: {
        username: string;
        password: string;
        options?: EdgeAccountOptions | undefined;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeAccount, {
        username: string;
        password: string;
        options?: EdgeAccountOptions | undefined;
    }> | undefined) => Promise<import("edge-core-js").EdgeAccount>;
};
export declare const useLoginWithPin: (context: EdgeContext) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<import("edge-core-js").EdgeAccount>;
    reset: () => void;
    execute: (variables: {
        username: string;
        pin: string;
        options?: EdgeAccountOptions | undefined;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeAccount, {
        username: string;
        pin: string;
        options?: EdgeAccountOptions | undefined;
    }> | undefined) => Promise<import("edge-core-js").EdgeAccount>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeAccount>;
    reset: () => void;
    execute: (variables: {
        username: string;
        pin: string;
        options?: EdgeAccountOptions | undefined;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeAccount, {
        username: string;
        pin: string;
        options?: EdgeAccountOptions | undefined;
    }> | undefined) => Promise<import("edge-core-js").EdgeAccount>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<import("edge-core-js").EdgeAccount>;
    reset: () => void;
    execute: (variables: {
        username: string;
        pin: string;
        options?: EdgeAccountOptions | undefined;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeAccount, {
        username: string;
        pin: string;
        options?: EdgeAccountOptions | undefined;
    }> | undefined) => Promise<import("edge-core-js").EdgeAccount>;
} | {
    status: "success";
    data: import("edge-core-js").EdgeAccount;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeAccount>;
    reset: () => void;
    execute: (variables: {
        username: string;
        pin: string;
        options?: EdgeAccountOptions | undefined;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeAccount, {
        username: string;
        pin: string;
        options?: EdgeAccountOptions | undefined;
    }> | undefined) => Promise<import("edge-core-js").EdgeAccount>;
};
export declare const useLoginWithRecovery: (context: EdgeContext) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<import("edge-core-js").EdgeAccount>;
    reset: () => void;
    execute: (variables: {
        username: string;
        answers: string[];
        recoveryKey: string;
        options: EdgeAccountOptions;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeAccount, {
        username: string;
        answers: string[];
        recoveryKey: string;
        options: EdgeAccountOptions;
    }> | undefined) => Promise<import("edge-core-js").EdgeAccount>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeAccount>;
    reset: () => void;
    execute: (variables: {
        username: string;
        answers: string[];
        recoveryKey: string;
        options: EdgeAccountOptions;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeAccount, {
        username: string;
        answers: string[];
        recoveryKey: string;
        options: EdgeAccountOptions;
    }> | undefined) => Promise<import("edge-core-js").EdgeAccount>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<import("edge-core-js").EdgeAccount>;
    reset: () => void;
    execute: (variables: {
        username: string;
        answers: string[];
        recoveryKey: string;
        options: EdgeAccountOptions;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeAccount, {
        username: string;
        answers: string[];
        recoveryKey: string;
        options: EdgeAccountOptions;
    }> | undefined) => Promise<import("edge-core-js").EdgeAccount>;
} | {
    status: "success";
    data: import("edge-core-js").EdgeAccount;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgeAccount>;
    reset: () => void;
    execute: (variables: {
        username: string;
        answers: string[];
        recoveryKey: string;
        options: EdgeAccountOptions;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgeAccount, {
        username: string;
        answers: string[];
        recoveryKey: string;
        options: EdgeAccountOptions;
    }> | undefined) => Promise<import("edge-core-js").EdgeAccount>;
};
export declare const useDeleteLocalAccount: (context: EdgeContext) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        username: string;
    }, options?: import("react-query").MutateOptions<void, {
        username: string;
    }> | undefined) => Promise<void>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        username: string;
    }, options?: import("react-query").MutateOptions<void, {
        username: string;
    }> | undefined) => Promise<void>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        username: string;
    }, options?: import("react-query").MutateOptions<void, {
        username: string;
    }> | undefined) => Promise<void>;
} | {
    status: "success";
    data: void;
    error: undefined;
    promise: Promise<void>;
    reset: () => void;
    execute: (variables: {
        username: string;
    }, options?: import("react-query").MutateOptions<void, {
        username: string;
    }> | undefined) => Promise<void>;
};
export declare const useRequestEdgeLogin: (context: EdgeContext) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<import("edge-core-js").EdgePendingEdgeLogin>;
    reset: () => void;
    execute: (variables: {
        options: EdgeEdgeLoginOptions;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgePendingEdgeLogin, {
        options: EdgeEdgeLoginOptions;
    }> | undefined) => Promise<import("edge-core-js").EdgePendingEdgeLogin>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgePendingEdgeLogin>;
    reset: () => void;
    execute: (variables: {
        options: EdgeEdgeLoginOptions;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgePendingEdgeLogin, {
        options: EdgeEdgeLoginOptions;
    }> | undefined) => Promise<import("edge-core-js").EdgePendingEdgeLogin>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<import("edge-core-js").EdgePendingEdgeLogin>;
    reset: () => void;
    execute: (variables: {
        options: EdgeEdgeLoginOptions;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgePendingEdgeLogin, {
        options: EdgeEdgeLoginOptions;
    }> | undefined) => Promise<import("edge-core-js").EdgePendingEdgeLogin>;
} | {
    status: "success";
    data: import("edge-core-js").EdgePendingEdgeLogin;
    error: undefined;
    promise: Promise<import("edge-core-js").EdgePendingEdgeLogin>;
    reset: () => void;
    execute: (variables: {
        options: EdgeEdgeLoginOptions;
    }, options?: import("react-query").MutateOptions<import("edge-core-js").EdgePendingEdgeLogin, {
        options: EdgeEdgeLoginOptions;
    }> | undefined) => Promise<import("edge-core-js").EdgePendingEdgeLogin>;
};
export declare const useRequestOtpReset: (context: EdgeContext) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<Date>;
    reset: () => void;
    execute: (variables: {
        username: string;
        otpResetToken: string;
    }, options?: import("react-query").MutateOptions<Date, {
        username: string;
        otpResetToken: string;
    }> | undefined) => Promise<Date>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<Date>;
    reset: () => void;
    execute: (variables: {
        username: string;
        otpResetToken: string;
    }, options?: import("react-query").MutateOptions<Date, {
        username: string;
        otpResetToken: string;
    }> | undefined) => Promise<Date>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<Date>;
    reset: () => void;
    execute: (variables: {
        username: string;
        otpResetToken: string;
    }, options?: import("react-query").MutateOptions<Date, {
        username: string;
        otpResetToken: string;
    }> | undefined) => Promise<Date>;
} | {
    status: "success";
    data: Date;
    error: undefined;
    promise: Promise<Date>;
    reset: () => void;
    execute: (variables: {
        username: string;
        otpResetToken: string;
    }, options?: import("react-query").MutateOptions<Date, {
        username: string;
        otpResetToken: string;
    }> | undefined) => Promise<Date>;
};
