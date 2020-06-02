import { EdgeAccount, EdgeCurrencyWallet, EdgeDenomination } from 'edge-core-js'
import { useEdgeAccount, useEdgeCurrencyWallet } from 'edge-react-hooks'
import * as React from 'react'
import { Card, Image, ListGroup } from 'react-bootstrap'

import { getCurrencyInfoFromCurrencyCode } from '../utils'
import { DisplayAmount, FiatAmount } from './ActiveWalletList'

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
          <ListGroup.Item key={currencyCode}>
            <Balance
              account={account}
              wallet={wallet}
              currencyInfo={getCurrencyInfoFromCurrencyCode(wallet, { currencyCode })}
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
  account: EdgeAccount
  wallet: EdgeCurrencyWallet
  currencyInfo: { currencyCode: string; denominations: EdgeDenomination[]; symbolImage: string }
  toCurrencyCode: string
  nativeAmount: string
}> = ({ currencyInfo, nativeAmount, account, wallet }) => {
  return (
    <div>
      <Image src={currencyInfo.symbolImage} />
      <DisplayAmount account={account} currencyInfo={currencyInfo} nativeAmount={nativeAmount} /> -{' '}
      <FiatAmount
        account={account}
        currencyInfo={currencyInfo}
        toCurrencyCode={wallet.fiatCurrencyCode}
        nativeAmount={nativeAmount}
      />
    </div>
  )
}
