import { type EdgeAccount, type EdgeCurrencyWallet } from 'edge-core-js'
import { useEdgeCurrencyWallet } from 'edge-react-hooks'
import * as React from 'react'

export const BalanceList: React.FC<{ account: EdgeAccount, wallet: EdgeCurrencyWallet }> = ({ wallet, account }) => {
  useEdgeCurrencyWallet(wallet, ['fiatCurrencyCode', 'balances'])

  return (
    <div>
      <div>Balances</div>
      {Object.entries(wallet.balances).map(([currencyCode, balance]: [string, any]) => (
        <Balance
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
  wallet: EdgeCurrencyWallet,
  fromCurrencyCode: string,
  toCurrencyCode: string,
  nativeAmount: string,
}> = ({ wallet, fromCurrencyCode, toCurrencyCode, nativeAmount }) => (
  <div key={fromCurrencyCode}>
    {fromCurrencyCode} {nativeAmount} ({toCurrencyCode})
  </div>
)
