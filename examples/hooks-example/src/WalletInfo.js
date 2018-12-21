// @flow

import React from "react";
import { type EdgeCurrencyWallet } from "edge-core-js";
import {
  useBalances,
  useFiatCurrencyCode,
  useName,
  useBlockHeight,
  useSyncRatio,
  useSync,
  useEnabledTokens
} from "edge-react-hooks";

const walletStyle = {
  border: "1px solid blue",
  padding: "5px",
  backgroundColor: "LightBlue"
};

export const WalletInfo = ({ wallet }: { wallet: EdgeCurrencyWallet }) => {
  const { fiatCurrencyCode, setFiatCurrencyCode, error: setFiatCurrencyCodeError } = useFiatCurrencyCode(wallet);
  const { name, setName } = useName(wallet);
  const balances = useBalances(wallet);
  const blockHeight = useBlockHeight(wallet);
  const syncRatio = useSyncRatio(wallet);
  // const { dataDump, getDataDump } = useDataDump(wallet);
  // const { enabledTokens, enableTokens, disableTokens } = useEnabledTokens(wallet);
  const { pending: syncPending, sync } = useSync(wallet);

  return (
    <div style={walletStyle}>
      <div>id: {wallet.id}</div>

      <div style={walletStyle}>
        <div>syncRatio: {syncRatio && syncRatio.toString()}</div>
      </div>

      <div style={walletStyle}>
        <div>name: {name && name.toString()}</div>
        <button onClick={() => setName(Math.random().toString())}>SET NAME</button>
      </div>

      <div style={walletStyle}>
        <div>blockHeight: {blockHeight && blockHeight.toString()}</div>
      </div>

      <div style={walletStyle}>
        <div>fiatCurrencyCode: {fiatCurrencyCode}</div>
        <div>fiatCurrencyCode error: {setFiatCurrencyCodeError && setFiatCurrencyCodeError.toString()}</div>
        <button onClick={() => setFiatCurrencyCode(Math.random().toString())}>SET FIAT</button>
      </div>

      <div style={walletStyle}>{JSON.stringify(balances, null, 2)}</div>
      {/* <div>
        <button onClick={() => enableTokens(["REP"])}>ENABLE REP</button>
        <button onClick={() => disableTokens(["REP"])}>DISABLE REP</button>
        <div>
          Enabled Tokens:
          {enabledTokens &&
            enabledTokens.map((token: string) => {
              return <div>{token}</div>;
            })}
        </div>
      </div>
       */}

      {/* <div>
        <div>dataDump: {dataDump && JSON.stringify(dataDump, null, 2)}</div>
        <button onClick={getDataDump}>GET DATA DUMP</button>
      </div> */}

      <div>
        <div>sync pending: {syncPending.toString()}</div>
        <button onClick={sync}>SYNC WALLET</button>
      </div>
    </div>
  );
};
