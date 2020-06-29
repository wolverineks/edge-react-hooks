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
exports.useSync = void 0;
var react_query_1 = require("react-query");
exports.useSync = function (syncable) {
    var _a = react_query_1.useMutation(function () { return syncable.sync(); }), execute = _a[0], rest = _a[1];
    return __assign({ execute: execute }, rest);
};
