// @flow

import React from "react";
import { type EdgeCurrencyWallet, type EdgeTransaction } from "edge-core-js";
import {
  useBalances,
  useFiatCurrencyCode,
  useName,
  useBlockHeight,
  useSyncRatio,
  useSync,
  useEnabledTokens,
  useEngine,
  useTransactionCount,
  useTransactions,
  useReceiveAddress
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
  const { enabledTokens, enableTokens, disableTokens } = useEnabledTokens(wallet);
  const { pending: syncPending, sync } = useSync(wallet);
  const {
    startEnginePending,
    stopEnginePending,
    startEngine,
    stopEngine,
    started,
    stopEngineError,
    startEngineError
  } = useEngine(wallet);
  const { transactionCount } = useTransactionCount(wallet);
  const { transactions } = useTransactions(wallet);
  const { receiveAddress } = useReceiveAddress(wallet);

  return (
    <div style={walletStyle}>
      <div>id: {wallet.id}</div>

      <div style={walletStyle}>
        <div>
          {startEnginePending && "Starting..."}
          {stopEnginePending && "Stopping..."}
          {started ? "Started" : "Stopped"}
          {startEngineError && startEngineError.toString()}
          {stopEngineError && stopEngineError.toString()}
        </div>
        <div>
          {!started && <button onClick={startEngine}>START ENGINE</button>}
          {started && <button onClick={stopEngine}>STOP ENGINE</button>}
        </div>
      </div>

      <div style={walletStyle}>
        <div>Transaction Count: {transactionCount && transactionCount.toString()}</div>
      </div>

      <div style={walletStyle}>
        <div>
          Transactions:{" "}
          {transactions &&
            transactions.map((transaction: EdgeTransaction) => (
              <div>
                {transaction.txid} - {transaction.nativeAmount}
              </div>
            ))}
        </div>
      </div>

      <div style={walletStyle}>
        <div>ReceiveAddress: {receiveAddress && receiveAddress.publicAddress}</div>
      </div>

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

      <div style={walletStyle}>
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

      {/* <div style={walletStyle}>
        <div>dataDump: {dataDump && JSON.stringify(dataDump, null, 2)}</div>
        <button onClick={getDataDump}>GET DATA DUMP</button>
      </div> */}

      <div style={walletStyle}>
        <div>sync pending: {syncPending.toString()}</div>
        <button onClick={sync}>SYNC WALLET</button>
      </div>
    </div>
  );
};
