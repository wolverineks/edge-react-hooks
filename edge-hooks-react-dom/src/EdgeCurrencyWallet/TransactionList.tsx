import { EdgeCurrencyWallet } from 'edge-core-js'
import { useTransactions } from 'edge-react-hooks'
import * as React from 'react'
import { Form, FormControl, FormLabel, ListGroup } from 'react-bootstrap'

const INITIAL_TRANSACTION_COUNT = 10
const TRANSACTION_COUNTS = [1, 5, 10, 15, 20, 25]

const onChange = (cb: Function) => (event: React.SyntheticEvent<any>) => cb(event.currentTarget.value)

export const TransactionList: React.FC<{ wallet: EdgeCurrencyWallet }> = ({ wallet }) => {
  const [currencyCode, setCurrencyCode] = React.useState<string>(wallet.currencyInfo.currencyCode)
  const [startEntries, setStartEntries] = React.useState<number>(INITIAL_TRANSACTION_COUNT)
  const options = React.useMemo(() => ({ currencyCode }), [currencyCode])
  const { transactions, pending } = useTransactions(wallet, { options })

  return (
    <ListGroup>
      <h1>Transactions</h1>
      <Form>
        <FormLabel>
          <FormControl as={'select'} onChange={onChange(setCurrencyCode)} value={wallet.currencyInfo.currencyCode}>
            <option value={wallet.currencyInfo.currencyCode}>
              {wallet.currencyInfo.currencyCode} - {wallet.currencyInfo.displayName}
            </option>

            {wallet.currencyInfo.metaTokens.map((token) => (
              <option key={token.currencyCode} value={token.currencyCode}>
                {token.currencyCode} - {token.currencyName}
              </option>
            ))}
          </FormControl>
        </FormLabel>

        <FormLabel>
          # of transactions
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
        </FormLabel>
      </Form>
      Transactions:
      {pending && <div>Loading transactions...</div>}
      {transactions &&
        transactions.map((transaction) => (
          <div key={transaction.txid} id={transaction.txid}>
            {transaction.nativeAmount} {transaction.currencyCode}
          </div>
        ))}
    </ListGroup>
  )
}
