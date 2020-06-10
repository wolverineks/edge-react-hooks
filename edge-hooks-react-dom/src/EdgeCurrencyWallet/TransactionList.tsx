import { EdgeAccount, EdgeCurrencyWallet, EdgeTransaction } from 'edge-core-js'
import { useEdgeCurrencyWallet, useTransactionCount, useTransactions } from 'edge-react-hooks'
import * as React from 'react'
import { Form, ListGroup } from 'react-bootstrap'

import { DisplayAmount } from '../Components/DisplayAmount'
import { Select } from '../Components/Select'
import { useDisplayDenomination } from '../utils/hooks'
import { getCurrencyCodes, getCurrencyInfoFromCurrencyCode } from '../utils/utils'

const INITIAL_TRANSACTION_COUNT = 10
const TRANSACTION_COUNTS = [1, 5, 10, 15, 20, 25]

export const TransactionList: React.FC<{ account: EdgeAccount; wallet: EdgeCurrencyWallet }> = ({
  account,
  wallet,
}) => {
  useEdgeCurrencyWallet(wallet)
  const [currencyCode, setCurrencyCode] = React.useState<string>(wallet.currencyInfo.currencyCode)
  const [startEntries, setStartEntries] = React.useState<number>(INITIAL_TRANSACTION_COUNT)
  const options = React.useMemo(() => ({ currencyCode, startEntries }), [currencyCode, startEntries])
  const { data: transactions, status } = useTransactions(wallet, { options })
  const { data: transactionCount } = useTransactionCount(wallet, { options })
  const currencyCodes = getCurrencyCodes(wallet)

  return (
    <ListGroup>
      <Form>
        <Select
          title={'CurrencyCode'}
          options={currencyCodes}
          renderOption={(currencyCode) => (
            <option key={currencyCode} value={currencyCode}>
              {currencyCode}
            </option>
          )}
          onSelect={(event) => setCurrencyCode(event.currentTarget.value)}
        />

        <Select
          title={'# of transactions'}
          options={transactionCount ? [...TRANSACTION_COUNTS, transactionCount] : TRANSACTION_COUNTS}
          renderOption={(num: number) => (
            <option key={num} value={num}>
              {num}
            </option>
          )}
          onSelect={(event) => setStartEntries(+event.currentTarget.value)}
        />
      </Form>

      <ListGroup>
        Transactions: #:{String(transactionCount)}
        {status === 'loading' && <div>Loading transactions...</div>}
        {transactionCount !== undefined && transactionCount <= 0 && <div>No Transactions</div>}
        {transactions &&
          transactions.map((transaction) => (
            <TransactionListRow account={account} wallet={wallet} transaction={transaction} key={transaction.txid} />
          ))}
      </ListGroup>
    </ListGroup>
  )
}

const TransactionListRow: React.FC<{
  account: EdgeAccount
  wallet: EdgeCurrencyWallet
  transaction: EdgeTransaction
}> = ({ account, wallet, transaction }) => {
  const currencyInfo = getCurrencyInfoFromCurrencyCode(wallet, { currencyCode: transaction.currencyCode })
  const displayDenomination = useDisplayDenomination(account, { currencyInfo })

  if (!displayDenomination) return <div>Loading...</div>

  return (
    <ListGroup.Item id={transaction.txid} variant={transaction.nativeAmount.startsWith('-') ? 'danger' : 'info'}>
      <span>
        {transaction.date}: <DisplayAmount nativeAmount={transaction.nativeAmount} currencyInfo={currencyInfo} />
      </span>

      {transaction.metadata && (
        <div>
          <div>Metadata</div>
          <div>Fiat: {transaction.metadata.amountFiat}</div>
          <div>Name: {transaction.metadata.name}</div>
          <div>Notes: {transaction.metadata.notes}</div>
          <div>Category: {transaction.metadata.category}</div>
          <div>Other: {JSON.stringify(transaction.metadata.miscJson, null, 2)}</div>
        </div>
      )}
    </ListGroup.Item>
  )
}
