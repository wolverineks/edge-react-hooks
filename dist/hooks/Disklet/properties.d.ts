import { Disklet } from 'disklet';
export declare const useFile: <FileType>(storage: Disklet, { path, parse }: {
    path: string;
    parse?: ((string: string) => FileType) | undefined;
}) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<FileType>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<FileType, undefined> | undefined) => Promise<FileType>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<FileType>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<FileType, undefined> | undefined) => Promise<FileType>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<FileType>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<FileType, undefined> | undefined) => Promise<FileType>;
} | {
    status: "success";
    data: FileType;
    error: undefined;
    promise: Promise<FileType>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<FileType, undefined> | undefined) => Promise<FileType>;
};
export declare const useFolder: (storage: Disklet, { path }: {
    path: string;
}) => {
    status: "idle";
    data: undefined;
    error: null;
    promise: Promise<import("disklet").DiskletListing>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("disklet").DiskletListing, undefined> | undefined) => Promise<import("disklet").DiskletListing>;
} | {
    status: "loading";
    data: undefined;
    error: undefined;
    promise: Promise<import("disklet").DiskletListing>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("disklet").DiskletListing, undefined> | undefined) => Promise<import("disklet").DiskletListing>;
} | {
    status: "error";
    data: undefined;
    error: Error;
    promise: Promise<import("disklet").DiskletListing>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("disklet").DiskletListing, undefined> | undefined) => Promise<import("disklet").DiskletListing>;
} | {
    status: "success";
    data: import("disklet").DiskletListing;
    error: undefined;
    promise: Promise<import("disklet").DiskletListing>;
    reset: () => void;
    execute: (variables?: undefined, options?: import("react-query").MutateOptions<import("disklet").DiskletListing, undefined> | undefined) => Promise<import("disklet").DiskletListing>;
};
