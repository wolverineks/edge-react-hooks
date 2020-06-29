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
exports.useMaxSpendable = exports.useSweepTransaction = exports.useNewTransaction = exports.useDenominationToNative = exports.useNativeToDenomination = exports.useParsedUri = exports.usePaymentProtocolInfo = exports.useReceiveAddressAndEncodeUri = exports.useTransactionCount = exports.useTransactions = exports.useEnabledTokens = void 0;
var React = __importStar(require("react"));
var react_query_1 = require("react-query");
var events_1 = require("./events");
exports.useEnabledTokens = function (wallet) {
    var _a = react_query_1.useMutation(function () { return wallet.getEnabledTokens(); }), execute = _a[0], rest = _a[1];
    React.useEffect(function () {
        execute();
    }, [execute, wallet]);
    return __assign({ execute: execute }, rest);
};
exports.useTransactions = function (wallet, _a) {
    var options = _a.options;
    var _b = react_query_1.useMutation(function () { return wallet.getTransactions(options); }), execute = _b[0], rest = _b[1];
    React.useEffect(function () {
        execute();
    }, [execute, wallet, options]);
    events_1.useOnNewTransactions(wallet, function () { return execute(); });
    events_1.useOnTransactionsChanged(wallet, function () { return execute(); });
    return __assign({ execute: execute }, rest);
};
exports.useTransactionCount = function (wallet, _a) {
    var options = _a.options;
    var _b = react_query_1.useMutation(function () { return wallet.getNumTransactions(options); }), execute = _b[0], rest = _b[1];
    React.useEffect(function () {
        execute();
    }, [execute, wallet, options]);
    events_1.useOnNewTransactions(wallet, function () { return execute(); });
    events_1.useOnTransactionsChanged(wallet, function () { return execute(); });
    return __assign({ execute: execute }, rest);
};
exports.useReceiveAddressAndEncodeUri = function (wallet, _a) {
    var nativeAmount = _a.nativeAmount, options = _a.options;
    var _b = react_query_1.useMutation(function () {
        var receiveAddress = wallet.getReceiveAddress({ currencyCode: options === null || options === void 0 ? void 0 : options.currencyCode });
        var encodeUri = receiveAddress.then(function (_a) {
            var publicAddress = _a.publicAddress;
            return wallet.encodeUri({
                publicAddress: publicAddress,
                nativeAmount: nativeAmount || '0',
            });
        });
        return Promise.all([receiveAddress, encodeUri]).then(function (_a) {
            var receiveAddress = _a[0], uri = _a[1];
            return ({ receiveAddress: receiveAddress, uri: uri });
        });
    }), execute = _b[0], rest = _b[1];
    React.useEffect(function () {
        execute();
    }, [execute, wallet, nativeAmount, options === null || options === void 0 ? void 0 : options.currencyCode]);
    return __assign({ execute: execute }, rest);
};
exports.usePaymentProtocolInfo = function (wallet, _a) {
    var uri = _a.uri;
    var _b = react_query_1.useMutation(function () { return wallet.getPaymentProtocolInfo(uri); }), execute = _b[0], rest = _b[1];
    React.useEffect(function () {
        execute();
    }, [execute, wallet, uri]);
    return __assign({ execute: execute }, rest);
};
exports.useParsedUri = function (wallet, _a) {
    var uri = _a.uri, currencyCode = _a.currencyCode;
    var _b = react_query_1.useMutation(function () { return wallet.parseUri(uri, currencyCode); }), execute = _b[0], rest = _b[1];
    React.useEffect(function () {
        execute();
    }, [execute, wallet, uri, currencyCode]);
    return __assign({ execute: execute }, rest);
};
exports.useNativeToDenomination = function (wallet, _a) {
    var nativeAmount = _a.nativeAmount, currencyCode = _a.currencyCode;
    var _b = react_query_1.useMutation(function () { return wallet.nativeToDenomination(nativeAmount, currencyCode); }), execute = _b[0], rest = _b[1];
    React.useEffect(function () {
        execute();
    }, [execute, wallet, nativeAmount, currencyCode]);
    return __assign({ execute: execute }, rest);
};
exports.useDenominationToNative = function (wallet, _a) {
    var denomimatedAmount = _a.denomimatedAmount, currencyCode = _a.currencyCode;
    var _b = react_query_1.useMutation(function () { return wallet.denominationToNative(denomimatedAmount, currencyCode); }), execute = _b[0], rest = _b[1];
    React.useEffect(function () {
        execute();
    }, [execute, wallet, denomimatedAmount, currencyCode]);
    return __assign({ execute: execute }, rest);
};
exports.useNewTransaction = function (wallet, _a) {
    var spendInfo = _a.spendInfo;
    var _b = react_query_1.useMutation(function () { return wallet.makeSpend(spendInfo); }), execute = _b[0], rest = _b[1];
    React.useEffect(function () {
        execute();
    }, [execute, wallet, spendInfo]);
    return __assign({ execute: execute }, rest);
};
exports.useSweepTransaction = function (wallet, _a) {
    var spendInfo = _a.spendInfo;
    var _b = react_query_1.useMutation(function () { return wallet.sweepPrivateKeys(spendInfo); }), execute = _b[0], rest = _b[1];
    React.useEffect(function () {
        execute();
    }, [execute, wallet, spendInfo]);
    return __assign({ execute: execute }, rest);
};
exports.useMaxSpendable = function (wallet, _a) {
    var spendInfo = _a.spendInfo;
    var _b = react_query_1.useMutation(function () { return wallet.getMaxSpendable(spendInfo); }), execute = _b[0], rest = _b[1];
    React.useEffect(function () {
        execute();
    }, [execute, wallet, spendInfo]);
    return __assign({ execute: execute }, rest);
};
