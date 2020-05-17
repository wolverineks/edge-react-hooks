import { useEdgeCurrencyWallet } from 'edge-react-hooks'
import * as React from 'react'

import { EdgeCurrencyWallet } from '../../../src/types'

const properties: (keyof EdgeCurrencyWallet)[] = ['fiatCurrencyCode', 'balances']

export const BalanceList: React.FC<{ wallet: EdgeCurrencyWallet }> = ({ wallet }) => {
  useEdgeCurrencyWallet(wallet, properties)

  return (
    <div>
      <div>Balances</div>
      {Object.entries(wallet.balances).map(([currencyCode, balance]: [string, any]) => (
        <Balance
          key={wallet.id}
          wallet={wallet}
          fromCurrencyCode={currencyCode}
          toCurrencyCode={wallet.fiatCurrencyCode}
          nativeAmount={balance}
        />
      ))}
    </div>
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
