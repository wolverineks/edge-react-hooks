import { EdgeAccount, EdgeContext, EdgeCurrencyWallet, EdgeRateCache } from 'edge-core-js';
declare type Closable = EdgeContext | EdgeAccount | EdgeCurrencyWallet | EdgeRateCache;
export declare const useOnClose: (object: Closable, callback: Function) => void;
export {};
