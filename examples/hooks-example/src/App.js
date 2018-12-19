// @flow

import { makeEdgeContext, type EdgeAccount, type EdgeCurrencyWallet, type EdgeUserInfo } from "edge-core-js";
import { ethereumCurrencyPluginFactory } from "edge-currency-ethereum";
import React, { useEffect, useState } from "react";
import {
  useActiveWalletIds,
  useArchivedWalletIds,
  useDeletedWalletIds,
  useOtpKey,
  useOtpResetDate,
  useLocalUsers,
  useSyncedStorage,
  useFiatCurrencyCode
} from "edge-react-hooks";

type Props = {||};
export const App = (props: Props) => {
  const [context, setContext] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const activeWalletIds = useActiveWalletIds(account);
  const archivedWalletIds = useArchivedWalletIds(account);
  const deletedWalletIds = useDeletedWalletIds(account);
  const localUsers = useLocalUsers(context);
  const otpResetDate = useOtpResetDate(account);
  const otpKey = useOtpKey(account);
  const { data, setData, writePending, readPending } = useSyncedStorage(account, "QWEQWE");

  const login = () => {
    setLoading(true);
    context &&
      context.loginWithPassword("edgy76", "Test123456").then(
        (account: EdgeAccount) => {
          setAccount(account);
          setLoading(false);
        },
        (error: Error) => alert(error)
      );
  };

  const reset = () => {
    account && account.logout();
    setAccount(null);
    context && context.deleteLocalAccount("edgy76");
  };

  useEffect(() => {
    const plugins = [ethereumCurrencyPluginFactory];
    const options = { apiKey: "cfcc4514d85fff7cb3e2e7ef5dee3b827270d030", appId: "", plugins: plugins };
    makeEdgeContext(options).then(setContext);
  }, []); // onMount

  return (
    <div className={"App"}>
      {context && !loading && !account && <button onClick={login}>Login</button>}
      {loading && <div>Loading...</div>}
      {account && <button onClick={reset}>reset</button>}
      <div>Previous Users: {localUsers.map((localUser: EdgeUserInfo) => localUser.username)}</div>

      <div>
        ActiveWallets:
        {account && account.currencyWallets && (
          <div>
            {(Object.values(account.currencyWallets): any).map((wallet: EdgeCurrencyWallet) => {
              const { data: name, setData: setName } = useSyncedStorage(wallet, "walletName");
              const { fiatCurrencyCode, setFiatCurrencyCode, error: setFiatCurrencyCodeError } = useFiatCurrencyCode(
                wallet
              );

              return (
                <div>
                  <div>id: {wallet.id}</div>

                  <div>
                    <div>name: {name && name.toString()}</div>
                    <button onClick={() => setName(Math.random().toString())}>SET NAME</button>
                  </div>

                  <div>
                    <div>fiatCurrencyCode: {fiatCurrencyCode}</div>
                    <div>fiatCurrencyCode error: {setFiatCurrencyCodeError && setFiatCurrencyCodeError.toString()}</div>
                    <button onClick={() => setFiatCurrencyCode(Math.random().toString())}>SET FIAT</button>
                  </div>

                  <div>{JSON.stringify(wallet.balances, null, 2)}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div>
        ActiveWalletIds: {activeWalletIds.length}
        {activeWalletIds.map((id: string) => (
          <div>{id}</div>
        ))}
      </div>

      <div>
        ArchivedWalletIds: {archivedWalletIds.length}
        {archivedWalletIds.map((id: string) => (
          <div>{id}</div>
        ))}
      </div>

      <div>
        DeletedWalletIds: {deletedWalletIds.length}
        {deletedWalletIds.map((id: string) => (
          <div>{id}</div>
        ))}
      </div>

      <div>otpResetDate: {otpResetDate}</div>
      <div>otpKey: {otpKey}</div>

      <div>
        <button onClick={() => setData(Math.random().toString())}>save data</button>
        <div>account data: {data && data.toString()}</div>
        <div>write pending: {writePending.toString()}</div>
        <div>read pending: {readPending.toString()}</div>
      </div>
    </div>
  );
};

export default App;
