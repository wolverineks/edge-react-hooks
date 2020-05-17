import { useEdgeAccount } from 'edge-react-hooks'
import * as React from 'react'

import { ActiveWalletList } from './ActiveWalletList'
import { ArchivedWalletList } from './ArchivedWalletList'
import { DeletedWalletList } from './DeletedWalletList'
import { CreateWallet } from './CreateWallet'

import { EdgeAccount } from '../../../src/types'

import { useSetAccount } from './useAccount'
import { useSelectedWallet } from '../EdgeCurrencyWallet/useSelectedWallet'
import { WalletInfo } from '../EdgeCurrencyWallet/WalletInfo'
import { Disklet } from '../Disklet/Disklet'

const accountProperties: (keyof EdgeAccount)[] = ['username', 'activeWalletIds']

export const AccountInfo = ({ account }: { account: EdgeAccount }) => {
  const selectedWallet = useSelectedWallet()
  const setAccount = useSetAccount()
  useEdgeAccount(account, accountProperties)

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
