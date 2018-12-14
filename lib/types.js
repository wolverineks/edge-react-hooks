// @flow

/* HACK: Remove these types when edge-core-js upgrades to flow-bin ^0.79.0 */

export type CallbackRemover = () => mixed

export type Subscriber<Events: {} = {}> = <Name: $Keys<Events>>(
  name: Name,
  f: (v: $ElementType<Events, Name>) => mixed
) => CallbackRemover

export type EdgeUserInfo = {
  pinLoginEnabled: boolean,
  username: string
}

export type EdgeContext = {
  localUsers: Array<EdgeUserInfo>,
  +watch: Subscriber<EdgeContext>
}

export type EdgeWalletInfoFull = {
  appIds: Array<string>,
  archived: boolean,
  deleted: boolean,
  id: string,
  keys: any,
  sortIndex: number,
  type: string
}

export type EdgeAccount = {
  +activeWalletIds: Array<string>,
  +allKeys: Array<EdgeWalletInfoFull>,
  +archivedWalletIds: Array<string>,
  +otpKey: string | void,
  +otpResetDate: string | void,
  +watch: Subscriber<EdgeAccount>
}
