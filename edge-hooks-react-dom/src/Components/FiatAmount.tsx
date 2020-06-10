import { EdgeAccount, EdgeDenomination } from 'edge-core-js'
import * as React from 'react'

import { getFiatInfo, useFiatAmount } from '../utils/utils'

export const FiatAmount = ({
  account,
  currencyInfo,
  toCurrencyCode,
  nativeAmount: _nativeAmount,
}: {
  account: EdgeAccount
  currencyInfo: { currencyCode: string; denominations: EdgeDenomination[] }
  toCurrencyCode: string
  nativeAmount: string
}) => {
  const fiatAmount = useFiatAmount({
    account,
    currencyInfo,
    toCurrencyCode,
    nativeAmount: _nativeAmount,
  })
  const fiatInfo = getFiatInfo({ currencyCode: toCurrencyCode })

  if (fiatAmount !== 0 && !fiatAmount) return <>Loading...</>

  return (
    <>
      {fiatInfo?.symbol} {fiatAmount.toFixed(2)} {fiatInfo?.currencyCode}
    </>
  )
}
