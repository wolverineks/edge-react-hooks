import { useEdgeAccount } from 'edge-react-hooks'
import * as React from 'react'

import { ActiveWalletList } from './ActiveWalletList.js'
import { ArchivedWalletList } from './ArchivedWalletList.js'
import { DeletedWalletList } from './DeletedWalletList.js'
import { CreateWallet } from './CreateWallet.js'

import { useSelectWallet, useSelectedWallet } from '../EdgeCurrencyWallet/useSelectedWallet.js'
import { WalletInfo } from '../EdgeCurrencyWallet/WalletInfo.js'
import { Disklet } from '../Disklet.js'

export const AccountInfo = ({ account }: { account: EdgeAccount }) => {
  const selectedWallet = useSelectedWallet()
  const selectWallet = useSelectWallet()

  useEdgeAccount(account, ['username', 'activeWalletIds'])

  return (
    <div>
      <h1>Account</h1>
      Username: {account.username} - <button onClick={account.logout}>Logout</button>
      <hr />
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex' }}>
          <ActiveWalletList account={account} selectWallet={selectWallet} />
        </div>
        <div style={{ display: 'flex' }}>
          <ArchivedWalletList account={account} />
        </div>
        <div style={{ display: 'flex' }}>
          <DeletedWalletList account={account} />
        </div>
      </div>
      <hr />
      <CreateWallet account={account} key={account.activeWalletIds.length} />
      <hr />
      {selectedWallet && <WalletInfo key={selectedWallet.id} account={account} wallet={selectedWallet} />}
      <hr />
      Disklet
      <Disklet disklet={account.disklet} path={'/'} />
      <hr />
      LocalDisklet
      <Disklet disklet={account.localDisklet} path={'/'} />
    </div>
  )
}
