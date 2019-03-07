// @flow

import { type EdgeAccount, type EdgeCurrencyWallet, type EdgeTransaction } from 'edge-core-js'
import { useGetTransactions } from 'edge-react-hooks'
import React, { useEffect, useState } from 'react'

export const TransactionList = ({ wallet, account }: { account: EdgeAccount, wallet: EdgeCurrencyWallet }) => {
  const [currencyCode, setCurrencyCode] = useState<string>(wallet.currencyInfo.currencyCode)
  const [startEntries, setStartEntries] = useState<number>(10)
  const { transactions, getTransactions, pending } = useGetTransactions()

  useEffect(() => {
    wallet.on('transactionsChanged', () => getTransactions(wallet, { currencyCode }))
    wallet.on('newTransactions', () => getTransactions(wallet, { currencyCode }))
  }, [wallet])

  useEffect(() => {
    getTransactions(wallet, { currencyCode, startEntries })
  }, [currencyCode, startEntries])

  return (
    <div>
      <form>
        <label>
          Choose a currency code
          <select onChange={(event: SyntheticInputEvent<HTMLInputElement>) => setCurrencyCode(event.target.value)}>
            <option
              selected={wallet.currencyInfo.currencyCode === currencyCode}
              value={wallet.currencyInfo.currencyCode}
            >
              {wallet.currencyInfo.currencyCode} - {wallet.currencyInfo.displayName}
            </option>

            {wallet.currencyInfo.metaTokens.map(token => (
              <option selected={token.currencyCode === currencyCode} value={token.currencyCode}>
                {token.currencyCode} - {token.currencyName}
              </option>
            ))}
          </select>
        </label>

        <label>
          # of transactions
          <select onChange={(event: SyntheticInputEvent<HTMLInputElement>) => setStartEntries(+event.target.value)}>
            {[1, 5, 10, 15, 20].map((num: number) => (
              <option key={num} selected={num === startEntries} value={num}>
                {num}
              </option>
            ))}
          </select>
        </label>
      </form>
      Transactions:
      {pending && <div>Loading transactions...</div>}
      {transactions &&
        transactions.map((transaction: EdgeTransaction) => (
          <div id={transaction.txid}>
            {transaction.nativeAmount} {transaction.currencyCode}
          </div>
        ))}
    </div>
  )
}
