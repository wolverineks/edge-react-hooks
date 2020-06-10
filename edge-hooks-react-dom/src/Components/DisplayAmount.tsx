import { EdgeDenomination } from 'edge-core-js'
import * as React from 'react'

import { useCurrencySetting } from '../Providers/SettingsProvider'
import { nativeToDenomination } from '../utils/utils'

export const DisplayAmount = ({
  nativeAmount,
  currencyInfo,
}: {
  nativeAmount: string
  currencyInfo: { currencyCode: string; denominations: EdgeDenomination[] }
}) => {
  const currencySetting = useCurrencySetting({ currencyCode: currencyInfo.currencyCode })
  if (!currencySetting) return <div>Loading...</div>

  const denomination =
    currencyInfo.denominations.find(
      (denomination) => denomination.multiplier === currencySetting.displayDenominationMultiplier,
    ) || currencyInfo.denominations[0]

  return (
    <>
      {denomination.symbol} {nativeToDenomination({ denomination, nativeAmount })} {denomination.name}
    </>
  )
}
