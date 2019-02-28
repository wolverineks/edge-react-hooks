// @flow

import { type EdgeAccount, type EdgeCurrencyWallet } from "edge-core-js";

type WalletId = $PropertyType<EdgeCurrencyWallet, "id">;
type Snapshot = string;
type Snapshots = { [WalletId]: Snapshot };

const changeAndSaveWalletState = (account: EdgeAccount, id: string, path: string) => {
  const snapshot = JSON.stringify(account.currencyWallets[id]);
  const setInitialState = async () =>
    Promise.resolve()
      .then(() => account.disklet.setText(path, "{}"))
      .then(() => account.disklet.getText(path));

  return account.disklet
    .getText(path)
    .catch((error: Error) => setInitialState())
    .then((string: string) => JSON.parse(string))
    .then((oldState: Snapshots) => ({ ...oldState, [id]: snapshot }))
    .then((newState: Snapshots) => account.disklet.setText(path, JSON.stringify(newState)))
    .then(() => account.changeWalletStates({ [id]: { archived: false } }))
    .catch((error: Error) => console.error(error));
};

export const activateWallet = (account: EdgeAccount, id: string) => {
  return changeAndSaveWalletState(account, id, "activeWallets");
};
export const archiveWallet = (account: EdgeAccount, id: string) => {
  return changeAndSaveWalletState(account, id, "archivedWallets");
};
export const deleteWallet = (account: EdgeAccount, id: string) => {
  return changeAndSaveWalletState(account, id, "deletedWallets");
};
