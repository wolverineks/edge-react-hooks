// @flow

import React from "react";
import { type EdgeAccount, type EdgeCurrencyWallet } from "edge-core-js";
import {
  useActiveWalletIds,
  useArchivedWalletIds,
  useDeletedWalletIds,
  useOtpKey,
  useOtpResetDate,
  useSyncedStorage,
  useCurrencyWallets
} from "edge-react-hooks";

import { WalletInfo } from "./WalletInfo.js";

const accountStyle = {
  border: "1px solid green",
  padding: "5px",
  backgroundColor: "LightGreen"
};

export const AccountInfo = ({ account }: { account: EdgeAccount }) => {
  const activeWalletIds = useActiveWalletIds(account);
  const archivedWalletIds = useArchivedWalletIds(account);
  const deletedWalletIds = useDeletedWalletIds(account);
  const currencyWallets = useCurrencyWallets(account);
  const otpResetDate = useOtpResetDate(account);
  const otpKey = useOtpKey(account);
  const { data, setData, writePending, readPending } = useSyncedStorage(account, "QWEQWE");

  return (
    <div>
      {activeWalletIds && (
        <div style={accountStyle}>
          ActiveWalletIds: {activeWalletIds.length}
          {activeWalletIds.map((id: string) => (
            <div>{id}</div>
          ))}
        </div>
      )}

      {archivedWalletIds && (
        <div style={accountStyle}>
          ArchivedWalletIds: {archivedWalletIds.length}
          {archivedWalletIds.map((id: string) => (
            <div>{id}</div>
          ))}
        </div>
      )}

      {deletedWalletIds && (
        <div style={accountStyle}>
          DeletedWalletIds: {deletedWalletIds.length}
          {deletedWalletIds.map((id: string) => (
            <div>{id}</div>
          ))}
        </div>
      )}

      <div style={accountStyle}>otpResetDate: {otpResetDate}</div>
      <div style={accountStyle}>otpKey: {otpKey}</div>

      <div style={accountStyle}>
        <button onClick={() => setData(Math.random().toString())}>save data</button>
        <div>account data: {data && data.toString()}</div>
        <div>write pending: {writePending.toString()}</div>
        <div>read pending: {readPending.toString()}</div>
      </div>

      <div style={accountStyle}>
        ActiveWallets:
        {account && account.currencyWallets && (
          <div>
            {(Object.values(currencyWallets): any).map((wallet: EdgeCurrencyWallet) => (
              <WalletInfo wallet={wallet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
