// @flow

import { type EdgeAccount, type EdgeCurrencyWallet } from 'edge-core-js'
import { useArchiveWallet, useDeleteWallet, useEdgeCurrencyWallet, useRenameWallet } from 'edge-react-hooks'
import React, { useState } from 'react'

import { BalanceList } from './BalanceList.js'
import { TransactionList } from './TransactionList.js'

export const WalletInfo = ({ wallet, account }: { account: EdgeAccount, wallet: EdgeCurrencyWallet }) => {
  useEdgeCurrencyWallet(wallet, ['name', 'fiatCurrencyCode', 'currencyInfo'])
  const { archiveWallet, pending: archivePending } = useArchiveWallet()
  const { deleteWallet, pending: deletePending } = useDeleteWallet()
  const { renameWallet, pending: renamePending } = useRenameWallet()
  const [walletName, setWalletName] = useState<string>('')
  return (
    <div>
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
    </div>
  )
}
