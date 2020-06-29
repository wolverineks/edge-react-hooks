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
exports.useRequestOtpReset = exports.useRequestEdgeLogin = exports.useDeleteLocalAccount = exports.useLoginWithRecovery = exports.useLoginWithPin = exports.useLoginWithPassword = exports.useLoginWithKey = exports.useCreateAccount = exports.useClose = void 0;
var react_query_1 = require("react-query");
exports.useClose = function (context) {
    var _a = react_query_1.useMutation(function () { return context.close(); }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useCreateAccount = function (context) {
    var _a = react_query_1.useMutation(function (_a) {
        var username = _a.username, password = _a.password, pin = _a.pin, options = _a.options;
        return context.createAccount(username, password, pin, options);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useLoginWithKey = function (context) {
    var _a = react_query_1.useMutation(function (_a) {
        var username = _a.username, loginKey = _a.loginKey, options = _a.options;
        return context.loginWithKey(username, loginKey, options);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useLoginWithPassword = function (context) {
    var _a = react_query_1.useMutation(function (_a) {
        var username = _a.username, password = _a.password, options = _a.options;
        return context.loginWithPassword(username, password, options);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useLoginWithPin = function (context) {
    var _a = react_query_1.useMutation(function (_a) {
        var username = _a.username, pin = _a.pin, options = _a.options;
        return context.loginWithPIN(username, pin, options);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useLoginWithRecovery = function (context) {
    var _a = react_query_1.useMutation(function (_a) {
        var username = _a.username, recoveryKey = _a.recoveryKey, _b = _a.answers, answers = _b === void 0 ? [] : _b, options = _a.options;
        return context.loginWithRecovery2(recoveryKey, username, answers, options);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useDeleteLocalAccount = function (context) {
    var _a = react_query_1.useMutation(function (_a) {
        var username = _a.username;
        return context.deleteLocalAccount(username);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useRequestEdgeLogin = function (context) {
    var _a = react_query_1.useMutation(function (_a) {
        var options = _a.options;
        return context.requestEdgeLogin(options);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
exports.useRequestOtpReset = function (context) {
    var _a = react_query_1.useMutation(function (_a) {
        var username = _a.username, otpResetToken = _a.otpResetToken;
        return context.requestOtpReset(username, otpResetToken);
    }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
