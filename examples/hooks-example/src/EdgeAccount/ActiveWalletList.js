import { useEdgeAccount, useEdgeCurrencyWallet, useChangeWalletStates } from 'edge-react-hooks'
import * as React from 'react'

import { useSelectWallet, useSelectedWallet } from '../EdgeCurrencyWallet/useSelectedWallet.js'

export const ActiveWalletList: React.FC<{ account: EdgeAccount }> = ({ account }) => {
  useEdgeAccount(account, ['activeWalletIds', 'currencyWallets'])
  const selectWallet = useSelectWallet()
  const selectedWallet = useSelectedWallet()

  return (
    <div>
      Active Wallets:
      {account.activeWalletIds
        .map((id) => account.currencyWallets[id])
        .map((wallet: EdgeCurrencyWallet) =>
          wallet ? (
            <ActiveWalletRow
              account={account}
              wallet={wallet}
              key={wallet.id}
              selectWallet={selectWallet}
              isSelected={wallet === selectedWallet}
            />
          ) : (
            <div key={Math.random()}>Loading...</div>
          ),
        )}
    </div>
  )
}

const ActiveWalletRow: React.FC<{ wallet: EdgeCurrencyWallet, account: EdgeAccount }> = ({ account, wallet }) => {
  const selectWallet = useSelectWallet()
  const selectedWallet = useSelectedWallet()
  const { changeWalletStates } = useChangeWalletStates()

  const archiveWallet = () => changeWalletStates(account, { [wallet.id]: { deleted: false, archived: true } })
  const deleteWallet = () => changeWalletStates(account, { [wallet.id]: { deleted: true, archived: false } })

  useEdgeCurrencyWallet(wallet, ['name', 'syncRatio'])
  useOnNewtransactions(wallet, (transactions: Array<EdgeTransaction>) =>
    alert(
      wallet.name
        ? `${wallet.name} - transactions.length > 1 ? 'New Transactions' : 'New Transaction'`
        : `transactions.length > 1 ? 'New Transactions' : 'New Transaction'`,
    ),
  )

  return (
    <div>
      <button onClick={archiveWallet}>Archive</button>
      <button onClick={deleteWallet}>Delete</button>
      {wallet !== selectedWallet && <button onClick={() => selectWallet(wallet)}>Select</button>}
      {wallet.name} - {wallet.syncRatio.toString()}
    </div>
  )
}

const useOnNewtransactions = (wallet: EdgeCurrencyWallet, callback: (transactions: Array<EdgeTransaction>) => mixed) =>
  React.useEffect(() => wallet.on('newTransactions', callback), [callback, wallet])
