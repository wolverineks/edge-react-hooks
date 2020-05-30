import { EdgeAccount, EdgeCurrencyWallet } from 'edge-core-js'
import { useConvertCurrency, useEdgeAccount, useEdgeCurrencyWallet } from 'edge-react-hooks'
import * as React from 'react'
import { Card, ListGroup } from 'react-bootstrap'

import { getCurrencySymbol, getFiatInfo } from '../utils'

export const BalanceList: React.FC<{ wallet: EdgeCurrencyWallet; account: EdgeAccount }> = ({ wallet, account }) => {
  useEdgeCurrencyWallet(wallet)
  useEdgeAccount(account)

  const balances = Object.entries(wallet.balances)

  return (
    <Card>
      <Card.Header>
        <Card.Title>Balances </Card.Title>
      </Card.Header>

      <ListGroup>
        {balances.map(([currencyCode, balance]: [string, any]) => (
          <ListGroup.Item key={wallet.id}>
            <Balance
              account={account}
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
  account: EdgeAccount
}> = ({ fromCurrencyCode, toCurrencyCode, nativeAmount, account, wallet }) => {
  const { data: fiatAmount } = useConvertCurrency(account.rateCache, {
    fromCurrency: fromCurrencyCode,
    toCurrency: toCurrencyCode,
    amount: 1, //Number(balance),
  })
  const symbol = getCurrencySymbol(account, { walletType: wallet.type })
  const fiatInfo = getFiatInfo({ currencyCode: toCurrencyCode })

  return (
    <div>
      {symbol} {nativeAmount} {fromCurrencyCode} - {fiatInfo?.symbol} {(fiatAmount || 0).toFixed(2)}{' '}
      {fiatInfo?.currencyCode}
    </div>
  )
}
