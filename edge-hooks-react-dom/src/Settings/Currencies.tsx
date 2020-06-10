import { EdgeAccount, EdgeCurrencyInfo, EdgeDenomination, EdgeMetaToken } from 'edge-core-js'
import { useEdgeAccount } from 'edge-react-hooks'
import * as React from 'react'
import { Image, ListGroup, ListGroupItem } from 'react-bootstrap'

import { useCurrencySetting } from '../utils/hooks'
import { getCurrencyInfos } from '../utils/utils'

export const Currencies = ({ account }: { account: EdgeAccount }) => {
  useEdgeAccount(account)
  const currencyInfos = getCurrencyInfos(account)

  return (
    <ListGroup style={{ paddingTop: 4, paddingBottom: 4 }}>
      {currencyInfos.map((currencyInfo) => (
        <CurrencySetting key={currencyInfo.currencyCode} currencyInfo={currencyInfo} account={account} />
      ))}
    </ListGroup>
  )
}

const CurrencySetting: React.FC<{
  account: EdgeAccount
  currencyInfo: EdgeCurrencyInfo
}> = ({ account, currencyInfo }) => {
  const { displayName, denominations, symbolImage, currencyCode, metaTokens } = currencyInfo
  const { read, write } = useCurrencySetting(account, { currencyCode })

  if (read.error) return <div>Error: {read.error.message}</div>
  if (!read.data) return <div>Loading...</div>

  const onSelect = (denomination: EdgeDenomination) =>
    write
      .execute({ data: { ...read.data, displayDenominationMultiplier: denomination.multiplier } })
      .then(() => read.execute())

  const { displayDenominationMultiplier } = read.data
  const selectedDenomination = denominations.find(({ multiplier }) => multiplier === displayDenominationMultiplier)
  const displayDenomination = selectedDenomination || denominations[0]

  return (
    <ListGroup style={{ paddingTop: 4, paddingBottom: 4 }}>
      <ListGroupItem>
        <Image src={symbolImage} />
        {displayName} - {currencyCode}
      </ListGroupItem>
      <Denominations
        denominations={denominations}
        onSelect={onSelect}
        selectedDenominationMultiplier={displayDenomination.multiplier}
      />
      {metaTokens.map((metaToken) => (
        <TokenSetting key={metaToken.currencyCode} account={account} tokenInfo={metaToken} />
      ))}
    </ListGroup>
  )
}

const TokenSetting: React.FC<{
  account: EdgeAccount
  tokenInfo: EdgeMetaToken
}> = ({ account, tokenInfo }) => {
  const { currencyName, currencyCode, denominations, symbolImage } = tokenInfo
  const { read, write } = useCurrencySetting(account, { currencyCode })

  if (read.error) return <div>Error: {read.error.message}</div>
  if (!read.data) return <div>Loading...</div>

  const onSelect = (denomination: EdgeDenomination) =>
    write
      .execute({ data: { ...read.data, displayDenominationMultiplier: denomination.multiplier } })
      .then(() => read.execute())

  const { displayDenominationMultiplier } = read.data
  const selectedDenomination = tokenInfo.denominations.find(
    ({ multiplier }) => multiplier === displayDenominationMultiplier,
  )
  const displayDenomination = selectedDenomination || denominations[0]

  return (
    <ListGroup style={{ paddingTop: 4, paddingBottom: 4 }}>
      <ListGroupItem>
        <Image src={symbolImage} />
        {currencyName} - {currencyCode} (token)
      </ListGroupItem>
      <Denominations
        denominations={denominations}
        onSelect={onSelect}
        selectedDenominationMultiplier={displayDenomination.multiplier}
      />
    </ListGroup>
  )
}

const Denominations = ({
  denominations,
  onSelect,
  selectedDenominationMultiplier,
}: {
  denominations: EdgeDenomination[]
  selectedDenominationMultiplier: string
  onSelect: (denomination: EdgeDenomination) => any
}) => (
  <>
    <ListGroupItem>Denomination</ListGroupItem>
    {denominations.map((denomination) => (
      <Denomination
        key={denomination.name}
        denomination={denomination}
        onSelect={onSelect}
        isSelected={denomination.multiplier === selectedDenominationMultiplier}
      />
    ))}
  </>
)

const Denomination: React.FC<{
  denomination: EdgeDenomination
  onSelect: (denomination: EdgeDenomination) => any
  isSelected: boolean
}> = ({ denomination, onSelect, isSelected }) => (
  <ListGroupItem onClick={() => onSelect(denomination)} variant={isSelected ? 'primary' : undefined}>
    {denomination.name}, {denomination.multiplier}, {denomination.symbol}
  </ListGroupItem>
)
