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
exports.useFolder = exports.useFile = void 0;
var React = __importStar(require("react"));
var react_query_1 = require("react-query");
exports.useFile = function (storage, _a) {
    var path = _a.path, _b = _a.parse, parse = _b === void 0 ? function (text) { return JSON.parse(text); } : _b;
    var _c = react_query_1.useMutation(function () { return Promise.resolve(path).then(storage.getText).then(parse); }), execute = _c[0], rest = _c[1];
    React.useEffect(function () {
        execute();
    }, [storage, path, execute]);
    return __assign({ execute: execute }, rest);
};
exports.useFolder = function (storage, _a) {
    var path = _a.path;
    var _b = react_query_1.useMutation(function () { return storage.list(path); }), execute = _b[0], rest = _b[1];
    React.useEffect(function () {
        execute();
    }, [storage, path, execute]);
    return __assign({ execute: execute }, rest);
};
