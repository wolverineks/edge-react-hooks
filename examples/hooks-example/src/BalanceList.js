// @flow

import { type EdgeAccount, type EdgeCurrencyWallet } from 'edge-core-js'
import { useEdgeCurrencyWallet } from 'edge-react-hooks'
import React from 'react'

export const BalanceList = ({ wallet, account }: { account: EdgeAccount, wallet: EdgeCurrencyWallet }) => {
  useEdgeCurrencyWallet(wallet, ['balances'])

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

const Balance = ({
  wallet,
  fromCurrencyCode,
  toCurrencyCode,
  nativeAmount,
}: {
  wallet: EdgeCurrencyWallet,
  fromCurrencyCode: string,
  toCurrencyCode: string,
  nativeAmount: string,
}) => {
  return (
    <div key={fromCurrencyCode}>
      {fromCurrencyCode} {nativeAmount} ({toCurrencyCode})
    </div>
  )
}
