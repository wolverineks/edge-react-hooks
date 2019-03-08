// @flow

import { type EdgeAccount, type EdgeCurrencyWallet, type EdgeTransaction } from 'edge-core-js'
import { useArchiveWallet, useDeleteWallet, useEdgeAccount, useEdgeCurrencyWallet } from 'edge-react-hooks'
import React, { useEffect } from 'react'

import { useSelectWallet } from './useSelectedWallet.js'

export const ActiveWalletList = ({
  account,
  selectWallet,
}: {
  account: EdgeAccount,
  selectWallet: EdgeCurrencyWallet => void,
}) => {
  useEdgeAccount(account, ['activeWalletIds', 'currencyWallets'])
  useEffect(() => {
    console.log('activeWalletIds', JSON.stringify(account.activeWalletIds, null, 2))
  })
  const wallets = account.activeWalletIds.map(id => account.currencyWallets[id])

  return (
    <div>
      Active Wallets:
      {wallets.map((wallet: EdgeCurrencyWallet, index: number) =>
        wallet ? (
          <ActiveWalletRow account={account} wallet={wallet} key={wallet.id} selectWallet={selectWallet} />
        ) : (
          <div key={index}>Loading...</div>
        ),
      )}
    </div>
  )
}

const ActiveWalletRow = ({
  account,
  wallet,
}: // selectWallet,
{
  wallet: EdgeCurrencyWallet,
  // selectWallet: EdgeCurrencyWallet => void,
  account: EdgeAccount,
}) => {
  useEdgeCurrencyWallet(wallet, ['name', 'syncRatio'])
  const selectWallet = useSelectWallet()
  const { archiveWallet, pending: archivePending } = useArchiveWallet()
  const { deleteWallet, pending: deletePending } = useDeleteWallet()

  useOnNewtransactions(wallet, (transactions: Array<EdgeTransaction>) => {
    alert(
      wallet.name
        ? `${wallet.name} - transactions.length > 1 ? 'New Transactions' : 'New Transaction'`
        : `transactions.length > 1 ? 'New Transactions' : 'New Transaction'`,
    )
  })

  return (
    <div>
      <button disabled={archivePending} onClick={() => archiveWallet(account, wallet.id)}>
        Archive
      </button>
      <button disabled={deletePending} onClick={() => deleteWallet(account, wallet.id)}>
        Delete
      </button>
      <button onClick={() => selectWallet(wallet)}>Select</button>
      {wallet.name} - {wallet.syncRatio.toString()}
    </div>
  )
}

export const useOnNewtransactions = (
  wallet: EdgeCurrencyWallet,
  callback: (transactions: Array<EdgeTransaction>) => mixed,
) => {
  useEffect(() => {
    wallet.on('newTransactions', callback)
  }, [wallet])
}
