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
exports.useChangeWalletState = exports.useChangeWalletStates = exports.useCreateCurrencyWallet = exports.useCreateWallet = exports.useSignEthereumTransaction = exports.useChangePassword = exports.useDeletePassword = exports.useDeletePin = exports.useChangePin = exports.useDeleteRecovery = exports.useChangeRecovery = exports.useLogout = exports.useCancelOtpReset = exports.useDisableOtp = exports.useEnableOtp = void 0;
var react_query_1 = require("react-query");
exports.useEnableOtp = function (account) {
    var _a = react_query_1.useMutation(function (_a) {
        var timeout = _a.timeout;
        return account.enableOtp(timeout);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useDisableOtp = function (account) {
    var _a = react_query_1.useMutation(function () { return account.disableOtp(); }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useCancelOtpReset = function (account) {
    var _a = react_query_1.useMutation(function () { return account.cancelOtpReset(); }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useLogout = function (account) {
    var _a = react_query_1.useMutation(function () { return account.logout(); }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useChangeRecovery = function (account) {
    var _a = react_query_1.useMutation(function (_a) {
        var questions = _a.questions, answers = _a.answers;
        return account.changeRecovery(questions, answers);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useDeleteRecovery = function (account) {
    var _a = react_query_1.useMutation(function () { return account.deleteRecovery(); }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useChangePin = function (account) {
    var _a = react_query_1.useMutation(function (_a) {
        var options = _a.options;
        return account.changePin(options);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useDeletePin = function (account) {
    var _a = react_query_1.useMutation(function () { return account.deletePin(); }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useDeletePassword = function (account) {
    var _a = react_query_1.useMutation(function () { return account.deletePassword(); }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useChangePassword = function (account) {
    var _a = react_query_1.useMutation(function (_a) {
        var password = _a.password;
        return account.changePassword(password);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useSignEthereumTransaction = function (account) {
    var _a = react_query_1.useMutation(function (_a) {
        var walletId = _a.walletId, transaction = _a.transaction;
        return account.signEthereumTransaction(walletId, transaction);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useCreateWallet = function (account) {
    var _a = react_query_1.useMutation(function (_a) {
        var type = _a.type, keys = _a.keys;
        return account.createWallet(type, keys);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useCreateCurrencyWallet = function (account) {
    var _a = react_query_1.useMutation(function (_a) {
        var type = _a.type, options = _a.options;
        return account.createCurrencyWallet(type, options);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useChangeWalletStates = function (account) {
    var _a = react_query_1.useMutation(function (_a) {
        var walletStates = _a.walletStates;
        return account.changeWalletStates(walletStates);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useChangeWalletState = function (account) {
    var _a = react_query_1.useMutation(function (_a) {
        var _b;
        var walletId = _a.walletId, walletState = _a.walletState;
        return account.changeWalletStates((_b = {}, _b[walletId] = walletState, _b));
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
