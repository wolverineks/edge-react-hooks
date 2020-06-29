"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useVerifyPassword = exports.useVerifyPin = exports.useConvertCurrency = exports.useLobby = exports.useSplitWalletInfo = exports.useWaitForCurrencyWallet = exports.useSplittableWalletTypes = exports.useSwapQuote = void 0;
var React = __importStar(require("react"));
var react_query_1 = require("react-query");
exports.useSwapQuote = function (account, _a) {
    var request = _a.request, options = _a.options;
    var _b = react_query_1.useMutation(function () { return account.fetchSwapQuote(request, options); }), execute = _b[0], rest = _b[1];
    React.useEffect(function () {
        execute();
    }, [execute, account, request, options]);
    return __assign({ execute: execute }, rest);
};
exports.useSplittableWalletTypes = function (account, _a) {
    var walletId = _a.walletId;
    var _b = react_query_1.useMutation(function () { return account.listSplittableWalletTypes(walletId); }), execute = _b[0], rest = _b[1];
    React.useEffect(function () {
        execute();
    }, [execute, account, walletId]);
    return __assign({ execute: execute }, rest);
};
exports.useWaitForCurrencyWallet = function (account, _a) {
    var walletId = _a.walletId;
    var _b = react_query_1.useMutation(function () { return account.waitForCurrencyWallet(walletId); }), execute = _b[0], rest = _b[1];
    React.useEffect(function () {
        execute();
    }, [execute, account, walletId]);
    return __assign({ execute: execute }, rest);
};
exports.useSplitWalletInfo = function (account, _a) {
    var walletId = _a.walletId, newWalletType = _a.newWalletType;
    var _b = react_query_1.useMutation(function () { return account.splitWalletInfo(walletId, newWalletType); }), execute = _b[0], rest = _b[1];
    React.useEffect(function () {
        execute();
    }, [execute, account, walletId, newWalletType]);
    return __assign({ execute: execute }, rest);
};
exports.useLobby = function (account, _a) {
    var lobbyId = _a.lobbyId;
    var _b = react_query_1.useMutation(function () { return account.fetchLobby(lobbyId); }), execute = _b[0], rest = _b[1];
    React.useEffect(function () {
        execute();
    }, [execute, account, lobbyId]);
    return __assign({ execute: execute }, rest);
};
exports.useConvertCurrency = function (rateCache, _a) {
    var fromCurrency = _a.fromCurrency, toCurrency = _a.toCurrency, amount = _a.amount, options = _a.options;
    var _b = react_query_1.useMutation(function () {
        return rateCache.convertCurrency(fromCurrency, toCurrency, amount, options);
    }), execute = _b[0], rest = _b[1];
    React.useEffect(function () {
        rateCache.on('update', function () { return execute(); });
        execute();
    }, [execute, rateCache, fromCurrency, toCurrency, amount, options]);
    return __assign({ execute: execute }, rest);
};
exports.useVerifyPin = function (account, _a) {
    var pin = _a.pin;
    var _b = react_query_1.useMutation(function () { return account.checkPin(pin); }), execute = _b[0], rest = _b[1];
    React.useEffect(function () {
        execute();
    }, [execute, account, pin]);
    return __assign({ execute: execute }, rest);
};
exports.useVerifyPassword = function (account, _a) {
    var password = _a.password;
    var _b = react_query_1.useMutation(function () { return account.checkPassword(password); }), execute = _b[0], rest = _b[1];
    React.useEffect(function () {
        execute();
    }, [execute, account, password]);
    return __assign({ execute: execute }, rest);
};
