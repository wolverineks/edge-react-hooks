import { EdgeContext } from 'edge-core-js';
export declare const useRecoveryQuestionChoices: (context: EdgeContext) => {
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
export declare const useLoginMessages: (context: EdgeContext, { username }: {
    username: string;
}) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<{
        otpResetPending: boolean;
        recovery2Corrupt: boolean;
    }>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<{
        otpResetPending: boolean;
        recovery2Corrupt: boolean;
    }, undefined> | undefined) => Promise<{
        otpResetPending: boolean;
        recovery2Corrupt: boolean;
    }>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<{
        otpResetPending: boolean;
        recovery2Corrupt: boolean;
    }>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<{
        otpResetPending: boolean;
        recovery2Corrupt: boolean;
    }, undefined> | undefined) => Promise<{
        otpResetPending: boolean;
        recovery2Corrupt: boolean;
    }>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<{
        otpResetPending: boolean;
        recovery2Corrupt: boolean;
    }>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<{
        otpResetPending: boolean;
        recovery2Corrupt: boolean;
    }, undefined> | undefined) => Promise<{
        otpResetPending: boolean;
        recovery2Corrupt: boolean;
    }>;
} | {
    status: "success";
    data: {
        otpResetPending: boolean;
        recovery2Corrupt: boolean;
    };
    error: undefined;
    promise: Promise<{
        otpResetPending: boolean;
        recovery2Corrupt: boolean;
    }>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<{
        otpResetPending: boolean;
        recovery2Corrupt: boolean;
    }, undefined> | undefined) => Promise<{
        otpResetPending: boolean;
        recovery2Corrupt: boolean;
    }>;
};
export declare const useRecoveryQuestions: (context: EdgeContext, { username, recoveryKey }: {
    username: string;
    recoveryKey: string;
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
export declare const useRecoveryKey: (context: EdgeContext, { username }: {
    username: string;
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
export declare const useUsernameAvailable: (context: EdgeContext, { username }: {
    username: string;
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
export declare const usePinLoginEnabled: (context: EdgeContext, { username }: {
    username: string;
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
