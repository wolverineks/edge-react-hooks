// @flow

import {
  eosCurrencyPluginFactory,
  rippleCurrencyPluginFactory,
  stellarCurrencyPluginFactory
} from "edge-currency-accountbased";
import {
  bitcoinCurrencyPluginFactory,
  bitcoincashCurrencyPluginFactory,
  bitcoingoldCurrencyPluginFactory,
  bitcoinsvCurrencyPluginFactory,
  dashCurrencyPluginFactory,
  digibyteCurrencyPluginFactory,
  feathercoinCurrencyPluginFactory,
  groestlcoinCurrencyPluginFactory,
  litecoinCurrencyPluginFactory,
  qtumCurrencyPluginFactory,
  smartcashCurrencyPluginFactory,
  ufoCurrencyPluginFactory,
  vertcoinCurrencyPluginFactory,
  zcoinCurrencyPluginFactory
} from "edge-currency-bitcoin";
import { ethereumCurrencyPluginFactory } from "edge-currency-ethereum";
// import { moneroCurrencyPluginFactory } from "edge-currency-monero";

export const contextOptions = {
  apiKey: "cfcc4514d85fff7cb3e2e7ef5dee3b827270d030",
  appId: "",
  plugins: [
    bitcoincashCurrencyPluginFactory,
    bitcoinCurrencyPluginFactory,
    bitcoingoldCurrencyPluginFactory,
    bitcoinsvCurrencyPluginFactory,
    dashCurrencyPluginFactory,
    digibyteCurrencyPluginFactory,
    eosCurrencyPluginFactory,
    ethereumCurrencyPluginFactory,
    feathercoinCurrencyPluginFactory,
    groestlcoinCurrencyPluginFactory,
    litecoinCurrencyPluginFactory,
    // moneroCurrencyPluginFactory,
    qtumCurrencyPluginFactory,
    rippleCurrencyPluginFactory,
    smartcashCurrencyPluginFactory,
    stellarCurrencyPluginFactory,
    ufoCurrencyPluginFactory,
    vertcoinCurrencyPluginFactory,
    zcoinCurrencyPluginFactory
  ]
};
