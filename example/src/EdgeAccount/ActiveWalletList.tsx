import { EdgeAccount, EdgeCurrencyWallet } from 'edge-core-js'
import { useChangeWalletStates, useWatch } from 'edge-react-hooks'
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
  const { changeWalletStates } = useChangeWalletStates(account)

  const archiveWallet = () => changeWalletStates({ [wallet.id]: { deleted: false, archived: true } })
  const deleteWallet = () => changeWalletStates({ [wallet.id]: { deleted: true, archived: false } })

  useWatch(wallet, 'name')
  useWatch(wallet, 'syncRatio')

  React.useEffect(() => {
    wallet.on('newTransactions', (transactions) => {
      transactions &&
        alert(
          wallet.name
            ? `${wallet.name} - transactions.length > 1 ? 'New Transactions' : 'New Transaction'`
            : `transactions.length > 1 ? 'New Transactions' : 'New Transaction'`,
        )
    })
  }, [wallet])

  return (
    <div>
      <button onClick={archiveWallet}>Archive</button>
      <button onClick={deleteWallet}>Delete</button>
      {wallet !== selectedWallet && <button onClick={() => selectWallet(wallet)}>Select</button>}
      {wallet.name} - {wallet.syncRatio.toString()}
    </div>
  )
}
