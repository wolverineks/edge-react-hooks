import { EdgeAccount } from 'edge-core-js'
import { useWatch } from 'edge-react-hooks'
import * as React from 'react'

import { Disklet } from '../Disklet/Disklet'
import { useSelectedWallet } from '../EdgeCurrencyWallet/useSelectedWallet'
import { WalletInfo } from '../EdgeCurrencyWallet/WalletInfo'
import { ActiveWalletList } from './ActiveWalletList'
import { ArchivedWalletList } from './ArchivedWalletList'
import { CreateWallet } from './CreateWallet'
import { DeletedWalletList } from './DeletedWalletList'
import { useSetAccount } from './useAccount'

export const AccountInfo = ({ account }: { account: EdgeAccount }) => {
  const selectedWallet = useSelectedWallet()
  const setAccount = useSetAccount()
  useWatch(account, 'username')
  useWatch(account, 'activeWalletIds')

  return (
    <div>
      <h1>Account</h1>
      Username: {account.username} -{' '}
      <button
        onClick={() => {
          setAccount(undefined)
          account.logout()
        }}
      >
        Logout
      </button>
      <hr />
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex' }}>
          <ActiveWalletList account={account} />
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
