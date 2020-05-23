import { EdgeCurrencyWallet } from 'edge-core-js'
import { useWatch } from 'edge-react-hooks'
import * as React from 'react'

export const BalanceList: React.FC<{ wallet: EdgeCurrencyWallet }> = ({ wallet }) => {
  useWatch(wallet, 'fiatCurrencyCode')
  useWatch(wallet, 'balances')

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
