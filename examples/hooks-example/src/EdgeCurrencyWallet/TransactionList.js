import { useGetTransactions } from 'edge-react-hooks'
import * as React from 'react'

const INITIAL_TRANSACTION_COUNT = 10
const TRANSACTION_COUNTS = [1, 5, 10, 15, 20, 25]

const onChange = (cb) => (event: SyntheticInputEvent<HTMLInputElement>) => cb(event.curentTarget.value)

export const TransactionList: React.FC<{ wallet: EdgeCurrencyWallet }> = ({ wallet }) => {
  const [currencyCode, setCurrencyCode] = React.useState < string > wallet.currencyInfo.currencyCode
  const [startEntries, setStartEntries] = React.useState < number > INITIAL_TRANSACTION_COUNT
  const { transactions, getTransactions, pending } = useGetTransactions()

  React.useEffect(() => {
    wallet.on('transactionsChanged', () => getTransactions(wallet, { currencyCode }))
    wallet.on('newTransactions', () => getTransactions(wallet, { currencyCode }))
  }, [currencyCode, getTransactions, wallet])

  React.useEffect(() => {
    getTransactions(wallet, { currencyCode, startEntries })
  }, [currencyCode, getTransactions, startEntries, wallet])

  return (
    <div>
      <h1>Transactions</h1>
      <form>
        <label>
          <select onChange={onChange(setCurrencyCode)}>
            <option
              selected={wallet.currencyInfo.currencyCode === currencyCode}
              value={wallet.currencyInfo.currencyCode}
            >
              {wallet.currencyInfo.currencyCode} - {wallet.currencyInfo.displayName}
            </option>

            {wallet.currencyInfo.metaTokens.map((token) => (
              <option selected={token.currencyCode === currencyCode} value={token.currencyCode}>
                {token.currencyCode} - {token.currencyName}
              </option>
            ))}
          </select>
        </label>

        <label>
          # of transactions
          <select onChange={onChange((count) => setStartEntries(+count))}>
            {TRANSACTION_COUNTS.map((num: number) => (
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
