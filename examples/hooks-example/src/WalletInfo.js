// @flow

import { type EdgeAccount, type EdgeCurrencyWallet, type EdgeTransaction } from 'edge-core-js'
import { useArchiveWallet, useDeleteWallet, useEdgeCurrencyWallet, useRenameWallet } from 'edge-react-hooks'
import React, { useEffect, useState } from 'react'

import { BalanceList } from './BalanceList.js'
import { Request } from './Request.js'
import { Send } from './Send.js'
import { TransactionList } from './TransactionList.js'

export const WalletInfo = ({ wallet, account }: { account: EdgeAccount, wallet: EdgeCurrencyWallet }) => {
  useEdgeCurrencyWallet(wallet, ['name', 'fiatCurrencyCode', 'currencyInfo'])
  // useEdgeCurrencyWallet(wallet)
  const { archiveWallet, pending: archivePending } = useArchiveWallet()
  const { deleteWallet, pending: deletePending } = useDeleteWallet()
  const { renameWallet, pending: renamePending } = useRenameWallet()
  const [walletName, setWalletName] = useState<string>('')

  useEffect(() => {
    wallet.on('newTransactions', (transactions: Array<EdgeTransaction>) => {
      alert(transactions.length > 1 ? 'New Transactions' : 'New Transaction')
    })
  }, [wallet])

  return (
    <div>
      <h1>Wallet</h1>
      {wallet.name} - {wallet.fiatCurrencyCode} - {wallet.currencyInfo.currencyCode}{' '}
      <div>
        <button disabled={archivePending} onClick={() => archiveWallet(account, wallet.id)}>
          Archive
        </button>
        <button disabled={deletePending} onClick={() => deleteWallet(account, wallet.id)}>
          Delete
        </button>
        <input
          disabled={renamePending}
          value={walletName}
          onChange={event => setWalletName(event.currentTarget.value)}
        />
        <button disabled={renamePending} onClick={() => renameWallet(wallet, walletName)}>
          {renamePending ? 'Renaming' : 'Rename'}
        </button>
      </div>
      <BalanceList account={account} wallet={wallet} />
      <TransactionList key={wallet.id} account={account} wallet={wallet} />
      <Send wallet={wallet} />
      <Request wallet={wallet} />
    </div>
  )
}
