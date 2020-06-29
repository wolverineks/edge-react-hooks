import { EdgeContext, EdgeContextEvents } from 'edge-core-js';
export declare const useOnError: (context: EdgeContext, callback: (response: EdgeContextEvents['error']) => any) => void;
export declare const useOnLogin: (context: EdgeContext, callback: (response: EdgeContextEvents['login']) => any) => void;
export declare const useOnLoginError: (context: EdgeContext, callback: (response: EdgeContextEvents['loginError']) => any) => void;
export declare const useOnLoginStart: (context: EdgeContext, callback: (response: EdgeContextEvents['loginStart']) => any) => void;
