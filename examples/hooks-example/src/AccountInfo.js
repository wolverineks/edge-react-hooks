// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useEdgeAccount } from 'edge-react-hooks'
import React from 'react'

import { ActiveWalletList } from './ActiveWalletList.js'
import { ArchivedWalletList } from './ArchivedWalletList.js'
import { DeletedWalletList } from './DeletedWalletList.js'

export const AccountInfo = ({ account, onLogout }: { account: EdgeAccount, onLogout: () => mixed }) => {
  useEdgeAccount(account, ['username'])
  const restoreAllWallets = () => {
    const newWalletStates = account.allKeys.reduce(
      (changes, { id }) => ({ ...changes, [id]: { archived: false, deleted: false } }),
      {},
    )
    account.changeWalletStates(newWalletStates)
  }

  const deleteAllWallets = () =>
    account.allKeys.forEach(({ id }) => account.changeWalletStates({ [id]: { deleted: true } }))
  const archiveAllWallets = () =>
    account.allKeys.forEach(({ id }) => account.changeWalletStates({ [id]: { archived: true } }))

  return (
    <div>
      <div>
        <button onClick={restoreAllWallets}>RESTORE ALL WALLETS</button>
      </div>
      <div>
        <button onClick={archiveAllWallets}>ARCHIVE ALL WALLETS</button>
      </div>
      <div>
        <button onClick={deleteAllWallets}>DELETE ALL WALLETS</button>
      </div>
      <div>
        Account: {account.username} - <button onClick={() => account.logout().then(onLogout)}>Logout</button>
      </div>
      <br />
      {/* <ActiveWalletList account={account} /> */}
      <br />
      {/* <ArchivedWalletList account={account} /> */}
      <br />
      {/* <DeletedWalletList account={account} /> */}
    </div>
  )
}
