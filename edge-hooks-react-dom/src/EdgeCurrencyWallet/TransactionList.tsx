import { EdgeCurrencyWallet } from 'edge-core-js'
import { useEdgeCurrencyWallet, useTransactions } from 'edge-react-hooks'
import * as React from 'react'
import { Form, FormControl, FormGroup, FormLabel, ListGroup } from 'react-bootstrap'

import { getCurrencyCodes } from './utils'

const INITIAL_TRANSACTION_COUNT = 10
const TRANSACTION_COUNTS = [1, 5, 10, 15, 20, 25]

const onChange = (cb: Function) => (event: React.SyntheticEvent<any>) => cb(event.currentTarget.value)

export const TransactionList: React.FC<{ wallet: EdgeCurrencyWallet }> = ({ wallet }) => {
  useEdgeCurrencyWallet(wallet)
  const [currencyCode, setCurrencyCode] = React.useState<string>(wallet.currencyInfo.currencyCode)
  const [startEntries, setStartEntries] = React.useState<number>(INITIAL_TRANSACTION_COUNT)
  const options = React.useMemo(() => ({ currencyCode }), [currencyCode])
  const { data: transactions, status } = useTransactions(wallet, { options })
  const currencyCodes = getCurrencyCodes(wallet)

  return (
    <ListGroup>
      <Form>
        <FormGroup>
          <FormLabel>CurrencyCode:</FormLabel>
          <FormControl
            as={'select'}
            value={currencyCode}
            onChange={(event) => setCurrencyCode(event.currentTarget.value)}
          >
            {currencyCodes.map((currencyCode) => (
              <option key={currencyCode} value={currencyCode}>
                {currencyCode}
              </option>
            ))}{' '}
          </FormControl>
        </FormGroup>

        <FormGroup>
          <FormLabel># of transactions</FormLabel>
          <FormControl
            as={'select'}
            onChange={onChange((count: string) => setStartEntries(+count))}
            value={startEntries}
          >
            {TRANSACTION_COUNTS.map((num: number) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </FormControl>
        </FormGroup>
      </Form>
      Transactions:
      {status === 'loading' && <div>Loading transactions...</div>}
      {transactions &&
        transactions.map((transaction) => (
          <div key={transaction.txid} id={transaction.txid}>
            {transaction.nativeAmount} {transaction.currencyCode}
          </div>
        ))}
    </ListGroup>
  )
}
