// @flow

import { type EdgeAccount, type EdgeCurrencyWallet } from 'edge-core-js'
import { useEdgeAccount } from 'edge-react-hooks'
import React, { useState } from 'react'

import { ActiveWalletList } from './ActiveWalletList.js'
import { ArchivedWalletList } from './ArchivedWalletList.js'
import { DeletedWalletList } from './DeletedWalletList.js'
import { WalletInfo } from './WalletInfo.js'

export const AccountInfo = ({ account, logout }: { account: EdgeAccount, logout: () => mixed }) => {
  useEdgeAccount(account, ['username'])

  const firstWallet = account.currencyWallets[account.activeWalletIds[0]]

  const [selectedWallet, setSelectedWallet] = useState<?EdgeCurrencyWallet>(firstWallet)

  return (
    <div>
      <div>
        Account: {account.username} - <button onClick={logout}>Logout</button>
        <Buttons account={account} />
        <hr />
        {selectedWallet && <WalletInfo account={account} wallet={selectedWallet} />}
      </div>
      <hr />
      <ActiveWalletList account={account} selectWallet={setSelectedWallet} />
      <hr />
      <ArchivedWalletList account={account} />
      <hr />
      <DeletedWalletList account={account} />
    </div>
  )
}

const Buttons = ({ account }: { account: EdgeAccount }) => {
  const restoreAllWallets = (account: EdgeAccount) => () => {
    const newWalletStates = account.allKeys.reduce(
      (changes, { id }) => ({ ...changes, [id]: { archived: false, deleted: false } }),
      {},
    )

    return account.changeWalletStates(newWalletStates)
  }

  const deleteAllWallets = (account: EdgeAccount) => () => {
    const walletStates = account.allKeys.reduce((walletStates, { id }) => {
      return { ...walletStates, [id]: { deleted: true } }
    }, {})

    return account.changeWalletStates(walletStates)
  }

  const archiveAllWallets = (account: EdgeAccount) => () => {
    const walletStates = account.allKeys.reduce((walletStates, { id }) => {
      return { ...walletStates, [id]: { archived: true } }
    }, {})

    return account.changeWalletStates(walletStates)
  }

  return (
    <div>
      <div>
        <button onClick={restoreAllWallets(account)}>RESTORE ALL WALLETS</button>
      </div>
      <div>
        <button onClick={archiveAllWallets(account)}>ARCHIVE ALL WALLETS</button>
      </div>
      <div>
        <button onClick={deleteAllWallets(account)}>DELETE ALL WALLETS</button>
      </div>
    </div>
  )
}
