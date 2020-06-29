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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePinLoginEnabled = exports.useUsernameAvailable = exports.useRecoveryKey = exports.useRecoveryQuestions = exports.useLoginMessages = exports.useRecoveryQuestionChoices = void 0;
var react_1 = __importDefault(require("react"));
var react_query_1 = require("react-query");
exports.useRecoveryQuestionChoices = function (context) {
    var _a = react_query_1.useMutation(context.listRecoveryQuestionChoices), execute = _a[0], rest = _a[1];
    react_1.default.useEffect(function () {
        execute();
    }, [execute, context]);
    return __assign({ execute: execute }, rest);
};
exports.useLoginMessages = function (context, _a) {
    var username = _a.username;
    var _b = react_query_1.useMutation(function () { return context.fetchLoginMessages().then(function (messages) { return messages[username]; }); }), execute = _b[0], rest = _b[1];
    react_1.default.useEffect(function () {
        execute();
    }, [execute, context, username]);
    return __assign({ execute: execute }, rest);
};
exports.useRecoveryQuestions = function (context, _a) {
    var username = _a.username, recoveryKey = _a.recoveryKey;
    var _b = react_query_1.useMutation(function () { return context.fetchRecovery2Questions(recoveryKey, username); }), execute = _b[0], rest = _b[1];
    react_1.default.useEffect(function () {
        execute();
    }, [execute, context, username, recoveryKey]);
    return __assign({ execute: execute }, rest);
};
exports.useRecoveryKey = function (context, _a) {
    var username = _a.username;
    var _b = react_query_1.useMutation(function () { return context.getRecovery2Key(username); }), execute = _b[0], rest = _b[1];
    react_1.default.useEffect(function () {
        execute();
    }, [execute, context, username]);
    return __assign({ execute: execute }, rest);
};
exports.useUsernameAvailable = function (context, _a) {
    var username = _a.username;
    var _b = react_query_1.useMutation(function () { return context.usernameAvailable(username); }), execute = _b[0], rest = _b[1];
    react_1.default.useEffect(function () {
        execute();
    }, [execute, context, username]);
    return __assign({ execute: execute }, rest);
};
exports.usePinLoginEnabled = function (context, _a) {
    var username = _a.username;
    var _b = react_query_1.useMutation(function () { return context.pinLoginEnabled(username); }), execute = _b[0], rest = _b[1];
    react_1.default.useEffect(function () {
        execute();
    }, [execute, context, username]);
    return __assign({ execute: execute }, rest);
};
