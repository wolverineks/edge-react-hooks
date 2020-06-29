"use strict";
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
exports.useEdgeSwapConfig = exports.useEdgeCurrencyConfig = exports.useEdgeCurrencyWallet = exports.useEdgeAccount = exports.useEdgeContext = exports.useWatchAll = exports.useWatch = void 0;
var React = __importStar(require("react"));
var useForceUpdate_1 = require("../../utils/useForceUpdate");
exports.useWatch = function (object, property, callback) {
    var forceUpdate = useForceUpdate_1.useForceUpdate();
    React.useEffect(function () {
        var unsub = object.watch(property, callback || forceUpdate);
        return function () {
            unsub();
        };
    });
};
exports.useWatchAll = function (object) {
    var forceUpdate = useForceUpdate_1.useForceUpdate();
    React.useEffect(function () {
        var unsubs = Object.keys(object).map(function (property) { return object.watch(property, forceUpdate); });
        return function () { return unsubs.forEach(function (unsub) { return unsub(); }); };
    }, [object, forceUpdate]);
};
exports.useEdgeContext = function (context) { return exports.useWatchAll(context); };
exports.useEdgeAccount = function (account) { return exports.useWatchAll(account); };
exports.useEdgeCurrencyWallet = function (wallet) { return exports.useWatchAll(wallet); };
exports.useEdgeCurrencyConfig = function (config) { return exports.useWatchAll(config); };
exports.useEdgeSwapConfig = function (swapConfig) { return exports.useWatchAll(swapConfig); };
