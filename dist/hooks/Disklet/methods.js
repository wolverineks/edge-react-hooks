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
exports.useDelete = exports.useWrite = void 0;
var react_query_1 = require("react-query");
exports.useWrite = function (storage, _a) {
    var path = _a.path, _b = _a.stringify, stringify = _b === void 0 ? JSON.stringify : _b;
    var _c = react_query_1.useMutation(function (_a) {
        var data = _a.data;
        return storage.setText(path, stringify(data));
    }), execute = _c[0], rest = _c[1];
    return __assign({ execute: execute }, rest);
};
exports.useDelete = function (storage, _a) {
    var path = _a.path;
    var _b = react_query_1.useMutation(function () { return storage.delete(path); }), execute = _b[0], rest = _b[1];
    return __assign({ execute: execute }, rest);
};
