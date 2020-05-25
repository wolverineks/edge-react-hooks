import { EdgeCurrencyWallet } from 'edge-core-js'
import { useWatch } from 'edge-react-hooks'
import * as React from 'react'
import { Card, ListGroup } from 'react-bootstrap'

export const BalanceList: React.FC<{ wallet: EdgeCurrencyWallet }> = ({ wallet }) => {
  useWatch(wallet, 'fiatCurrencyCode')
  useWatch(wallet, 'balances')

  return (
    <Card>
      <Card.Header>
        <Card.Title>Balances </Card.Title>
      </Card.Header>

      <ListGroup>
        {Object.entries(wallet.balances).map(([currencyCode, balance]: [string, any]) => (
          <ListGroup.Item key={wallet.id}>
            <Balance
              wallet={wallet}
              fromCurrencyCode={currencyCode}
              toCurrencyCode={wallet.fiatCurrencyCode}
              nativeAmount={balance}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  )
}

const Balance: React.FC<{
  wallet: EdgeCurrencyWallet
  fromCurrencyCode: string
  toCurrencyCode: string
  nativeAmount: string
}> = ({ fromCurrencyCode, toCurrencyCode, nativeAmount }) => (
  <div key={fromCurrencyCode}>
    {fromCurrencyCode} {nativeAmount} ({toCurrencyCode})
  </div>
)
