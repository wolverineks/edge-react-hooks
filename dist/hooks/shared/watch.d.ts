import { EdgeAccount, EdgeContext, EdgeCurrencyConfig, EdgeCurrencyWallet, EdgeSwapConfig } from 'edge-core-js';
import { Subscriber } from 'yaob';
declare type Watchable = {
    watch: Subscriber<any>;
};
export declare const useWatch: <W extends Watchable, P extends keyof W>(object: W, property: P, callback?: ((data: W[P]) => any) | undefined) => void;
export declare const useWatchAll: <E extends Watchable>(object: E) => void;
export declare const useEdgeContext: (context: EdgeContext) => void;
export declare const useEdgeAccount: (account: EdgeAccount) => void;
export declare const useEdgeCurrencyWallet: (wallet: EdgeCurrencyWallet) => void;
export declare const useEdgeCurrencyConfig: (config: EdgeCurrencyConfig) => void;
export declare const useEdgeSwapConfig: (swapConfig: EdgeSwapConfig) => void;
export {};
