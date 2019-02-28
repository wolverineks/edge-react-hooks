// @flow

import { type EdgeAccount, type EdgeCurrencyWallet, type EdgeTransaction } from 'edge-core-js'
import { useEdgeAccount, useEdgeCurrencyWallet, useTransactions } from 'edge-react-hooks'
import React, { useEffect, useRef, useState } from 'react'

export const ActiveWalletList = ({ account }: { account: EdgeAccount }) => {
  useEdgeAccount(account, ['activeWalletIds', 'currencyWallets'])

  return (
    <div>
      Active Wallets:
      {account.activeWalletIds
        .map(id => account.currencyWallets[id])
        .map((wallet: ?EdgeCurrencyWallet, index: number) =>
          wallet ? (
            <ActiveWalletRow key={wallet.id} account={account} wallet={wallet} />
          ) : (
            <div key={index}>LOADING...</div>
          ),
        )}
    </div>
  )
}

const ActiveWalletRow = ({ account, wallet }: { wallet: EdgeCurrencyWallet, account: EdgeAccount }) => {
  useEdgeCurrencyWallet(wallet, ['name', 'syncRatio'])
  const archiveWallet = useAsync()
  const deleteWallet = useAsync()

  const handleArchiveWallet = () => {
    wallet && archiveWallet.async(() => account.changeWalletStates({ [wallet.id]: { archived: true } }))
  }

  const handleDeleteWallet = () => {
    wallet && deleteWallet.async(() => account.changeWalletStates({ [wallet.id]: { deleted: true } }))
  }

  return (
    <div>
      <div>
        {wallet.name} - {wallet.syncRatio.toString()}
      </div>
      <button disabled={!wallet} onClick={handleArchiveWallet}>
        Archive
      </button>
      <button disabled={!wallet} onClick={handleDeleteWallet}>
        Delete
      </button>
      <BalanceList wallet={wallet} />
      <TransactionList wallet={wallet} />
    </div>
  )
}

const BalanceList = ({ wallet }) => {
  return (
    <div>
      <div>Balances</div>
      {Object.entries(wallet.balances).map(([currencyCode, balance]: [string, string]) => (
        <div key={currencyCode}>
          {currencyCode} - {balance}
        </div>
      ))}
    </div>
  )
}

const TransactionList = ({ wallet }) => {
  const { transactions } = useTransactions(wallet)
  return (
    <div>
      Transactions:
      {transactions &&
        transactions.map((transaction: EdgeTransaction) => (
          <div id={transaction.txid}>
            {transaction.date} - {transaction.currencyCode} - {transaction.nativeAmount}
          </div>
        ))}
    </div>
  )
}

const useAsync = () => {
  const isMounted = useRef(false)
  useEffect(() => {
    isMounted.current = true
    return () => (isMounted.current = false)
  }, [])

  const [state, setState] = useState({ pending: false, error: null, data: null })
  const onStart = () => setState(state => ({ ...state, pending: true, error: null }))
  const onSuccess = (data: any) => isMounted.current && setState(state => ({ ...state, pending: false, data }))
  const onError = (error: Error) => isMounted.current && setState(state => ({ ...state, pending: false, error }))

  const async = (asyncFunction: () => Promise<any>) => {
    if (!isMounted.current) throw new Error('Attempting to call async in unmounted component')
    if (state.pending) throw new Error("Use 'pending' to prevent multiple simultaneous async calls")
    onStart()
    asyncFunction()
      .then(onSuccess)
      .catch(onError)
  }

  return { async, ...state }
}
