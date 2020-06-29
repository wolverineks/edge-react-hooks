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
exports.useNewEdgeContext = void 0;
var edge_core_js_1 = require("edge-core-js");
var React = __importStar(require("react"));
var react_query_1 = require("react-query");
exports.useNewEdgeContext = function (_a) {
    var apiKey = _a.apiKey, appId = _a.appId, authServer = _a.authServer, hideKeys = _a.hideKeys, path = _a.path, plugins = _a.plugins;
    var _b = react_query_1.useMutation(function () { return edge_core_js_1.makeEdgeContext({ apiKey: apiKey, appId: appId, authServer: authServer, hideKeys: hideKeys, path: path, plugins: plugins }); }), execute = _b[0], rest = _b[1];
    React.useEffect(function () {
        execute();
    }, [execute, apiKey, appId, authServer, hideKeys, path, plugins]);
    return __assign({ execute: execute }, rest);
};
