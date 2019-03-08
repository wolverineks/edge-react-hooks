// @flow

import { type EdgeAccount, type EdgeCurrencyWallet } from 'edge-core-js'
import { useEdgeAccount } from 'edge-react-hooks'
import React, { useEffect } from 'react'

import { ActiveWalletList } from './ActiveWalletList.js'
import { ArchivedWalletList } from './ArchivedWalletList.js'
import { DeletedWalletList } from './DeletedWalletList.js'
import { useSelectWallet, useSelectedWallet } from './useSelectedWallet.js'
import { WalletInfo } from './WalletInfo.js'

export const AccountInfo = ({ account, logout }: { account: EdgeAccount, logout: () => mixed }) => {
  useEdgeAccount(account, ['username'])
  const selectedWallet = useSelectedWallet()
  const selectWallet = useSelectWallet()
  const firstWallet: ?EdgeCurrencyWallet = account.currencyWallets[account.activeWalletIds[0]]

  useEffect(() => {
    !selectedWallet && firstWallet && selectWallet(firstWallet)
  }, [firstWallet])

  return (
    <div>
      <h1>Account</h1>
      <div>
        Username: {account.username} - <button onClick={logout}>Logout</button>
        <hr />
        {selectedWallet && <WalletInfo key={selectedWallet.id} account={account} wallet={selectedWallet} />}
      </div>
      <hr />
      <ActiveWalletList account={account} selectWallet={selectWallet} />
      <hr />
      <ArchivedWalletList account={account} />
      <hr />
      <DeletedWalletList account={account} />
    </div>
  )
}
