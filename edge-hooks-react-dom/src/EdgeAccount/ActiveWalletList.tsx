import { EdgeAccount, EdgeCurrencyWallet } from 'edge-core-js'
import { useChangeWalletState, useOnNewTransactions, useWatch } from 'edge-react-hooks'
import * as React from 'react'

import { useSelectWallet, useSelectedWallet } from '../EdgeCurrencyWallet/useSelectedWallet'

export const ActiveWalletList: React.FC<{ account: EdgeAccount }> = ({ account }) => {
  useWatch(account, 'activeWalletIds')
  useWatch(account, 'currencyWallets')

  return (
    <div>
      Active Wallets:
      {account.activeWalletIds
        .map((id) => account.currencyWallets[id])
        .map((wallet, index) =>
          wallet ? (
            <ActiveWalletRow account={account} wallet={wallet} key={wallet.id} />
          ) : (
            <div key={index}>Loading...</div>
          ),
        )}
    </div>
  )
}

const ActiveWalletRow: React.FC<{ wallet: EdgeCurrencyWallet; account: EdgeAccount }> = ({ account, wallet }) => {
  const selectWallet = useSelectWallet()
  const selectedWallet = useSelectedWallet()

  const { changeWalletState, pending } = useChangeWalletState(account)
  const archiveWallet = () => changeWalletState({ walletId: wallet.id, walletState: { archived: true } })
  const deleteWallet = () => changeWalletState({ walletId: wallet.id, walletState: { deleted: true } })

  useWatch(wallet, 'name')
  useWatch(wallet, 'syncRatio')

  useOnNewTransactions(wallet, (transactions) => {
    alert(`${wallet.name} - ${transactions.length > 1 ? 'New Transactions' : 'New Transaction'}`)
  })

  return (
    <div>
      <button disabled={pending} onClick={archiveWallet}>
        Archive
      </button>
      <button disabled={pending} onClick={deleteWallet}>
        Delete
      </button>
      {wallet !== selectedWallet && <button onClick={() => selectWallet(wallet)}>Select</button>}
      {wallet.name} - {wallet.syncRatio.toString()}
    </div>
  )
}
