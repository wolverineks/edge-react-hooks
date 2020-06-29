import { EdgeCurrencyWallet, EdgeTransaction } from 'edge-core-js';
export declare const useOnNewTransactions: (wallet: EdgeCurrencyWallet, callback: (transactions: Array<EdgeTransaction>) => any) => void;
export declare const useOnTransactionsChanged: (wallet: EdgeCurrencyWallet, callback: (transactions: Array<EdgeTransaction>) => any) => void;
