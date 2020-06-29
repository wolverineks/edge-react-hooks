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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSetFiatCurrencyCode = exports.useRenameWallet = exports.useSaveTransactionMetadata = exports.useExportTransactionsToCSV = exports.useExportTransactionsToQBO = exports.useLockReceiveAddress = exports.useSaveReceiveAddress = exports.useDisableTokens = exports.useEnableTokens = exports.useAddCustomToken = exports.useSignBroadcastAndSaveTransaction = exports.useSaveTransaction = exports.useBroadcastTransaction = exports.useSignTransaction = exports.useDumpData = exports.useResyncBlockchain = exports.useStartEngine = exports.useStopEngine = void 0;
var react_query_1 = require("react-query");
exports.useStopEngine = function (wallet) {
    var _a = react_query_1.useMutation(function () { return wallet.stopEngine(); }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useStartEngine = function (wallet) {
    var _a = react_query_1.useMutation(function () { return wallet.startEngine(); }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useResyncBlockchain = function (wallet) {
    var _a = react_query_1.useMutation(function () { return wallet.resyncBlockchain(); }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useDumpData = function (wallet) {
    var _a = react_query_1.useMutation(function () { return wallet.dumpData(); }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useSignTransaction = function (wallet) {
    var _a = react_query_1.useMutation(function (_a) {
        var transaction = _a.transaction;
        return wallet.signTx(transaction);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useBroadcastTransaction = function (wallet) {
    var _a = react_query_1.useMutation(function (_a) {
        var transaction = _a.transaction;
        return wallet.broadcastTx(transaction);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useSaveTransaction = function (wallet) {
    var _a = react_query_1.useMutation(function (_a) {
        var transaction = _a.transaction;
        return wallet.saveTx(transaction);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useSignBroadcastAndSaveTransaction = function (wallet) {
    var _a = react_query_1.useMutation(function (_a) {
        var transaction = _a.transaction;
        return wallet.saveTx(transaction);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useAddCustomToken = function (wallet) {
    var _a = react_query_1.useMutation(function (_a) {
        var tokenInfo = _a.tokenInfo;
        return wallet.addCustomToken(tokenInfo);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useEnableTokens = function (wallet) {
    var _a = react_query_1.useMutation(function (_a) {
        var tokens = _a.tokens;
        return wallet.enableTokens(tokens);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useDisableTokens = function (wallet) {
    var _a = react_query_1.useMutation(function (_a) {
        var tokens = _a.tokens;
        return wallet.disableTokens(tokens);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useSaveReceiveAddress = function (wallet) {
    var _a = react_query_1.useMutation(function (_a) {
        var receiveAddress = _a.receiveAddress;
        return wallet.saveReceiveAddress(receiveAddress);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useLockReceiveAddress = function (wallet) {
    var _a = react_query_1.useMutation(function (_a) {
        var receiveAddress = _a.receiveAddress;
        return wallet.lockReceiveAddress(receiveAddress);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useExportTransactionsToQBO = function (wallet) {
    var _a = react_query_1.useMutation(function (_a) {
        var options = _a.options;
        return wallet.exportTransactionsToQBO(options);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useExportTransactionsToCSV = function (wallet) {
    var _a = react_query_1.useMutation(function (_a) {
        var options = _a.options;
        return wallet.exportTransactionsToCSV(options);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useSaveTransactionMetadata = function (wallet) {
    var _a = react_query_1.useMutation(function (_a) {
        var txid = _a.txid, currencyCode = _a.currencyCode, metadata = _a.metadata;
        return wallet.saveTxMetadata(txid, currencyCode, metadata);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useRenameWallet = function (wallet) {
    var _a = react_query_1.useMutation(function (_a) {
        var name = _a.name;
        return wallet.renameWallet(name);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useSetFiatCurrencyCode = function (wallet) {
    var _a = react_query_1.useMutation(function (_a) {
        var fiatCurrencyCode = _a.fiatCurrencyCode;
        return wallet.setFiatCurrencyCode(fiatCurrencyCode);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
