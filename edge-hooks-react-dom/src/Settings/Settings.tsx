import { EdgeAccount, EdgeContext, EdgeCurrencyInfo, EdgeDenomination } from 'edge-core-js'
import { useChangePin, useEdgeAccount, usePinLoginEnabled } from 'edge-react-hooks'
import * as React from 'react'
import { Form, FormControl, FormGroup, FormLabel, Image, ListGroup, ListGroupItem } from 'react-bootstrap'

import {
  EdgeCurrencySettings,
  fiatCurrencyInfos,
  getCurrencyInfos,
  getFiatInfo,
  useAutologoutDelay,
  useCurrencySetting,
  useDefaultFiatCurrencyCode,
} from '../utils'

export const Settings = ({ account, context }: { account: EdgeAccount; context: EdgeContext }) => {
  return (
    <ListGroup>
      <AutoLogout account={account} />
      <DefaultFiatSetting account={account} />
      <PinLoginSetting context={context} account={account} />
      <CurrencySettings account={account} />
    </ListGroup>
  )
}

const AutoLogout = ({ account }: { account: EdgeAccount }) => {
  const { read, write } = useAutologoutDelay(account)

  if (read.error) return <div>Error: {read.error.message}</div>
  if (!read.data) return <ListGroupItem>AutoLogout: Loading...</ListGroupItem>
  const pending = write.status === 'loading'

  return (
    <ListGroupItem>
      <Form>
        <FormGroup>
          <FormLabel>AutoLogout: {read.data}</FormLabel>
          <FormControl
            disabled={pending}
            onChange={(event) => write.execute({ data: Number(event.currentTarget.value) }).then(() => read.execute())}
            defaultValue={read.data}
          />
        </FormGroup>
      </Form>
    </ListGroupItem>
  )
}

const DefaultFiatSetting = ({ account }: { account: EdgeAccount }) => {
  const { read, write } = useDefaultFiatCurrencyCode(account)

  if (read.error) return <div>Error: {read.error.message}</div>
  if (!read.data) return <ListGroupItem>Default Fiat: Loading...</ListGroupItem>

  const pending = write.status === 'loading'
  const defaultFiatInfo = getFiatInfo({ currencyCode: read.data })

  return (
    <ListGroupItem>
      <Form>
        <FormGroup>
          <FormLabel>Default Fiat: {read.data}</FormLabel>
          <FormControl
            as={'select'}
            disabled={pending}
            onChange={(event) => write.execute({ data: event.currentTarget.value }).then(() => read.execute())}
            defaultValue={read.data}
          >
            {defaultFiatInfo && (
              <option key={defaultFiatInfo.isoCurrencyCode} value={defaultFiatInfo.isoCurrencyCode}>
                {defaultFiatInfo.symbol} - {defaultFiatInfo.currencyCode}
              </option>
            )}
            {fiatCurrencyInfos.map((info) => (
              <option key={info.isoCurrencyCode} value={info.isoCurrencyCode}>
                {info.symbol} - {info.currencyCode}
              </option>
            ))}
          </FormControl>
        </FormGroup>
      </Form>
    </ListGroupItem>
  )
}

const PinLoginSetting = ({ context, account }: { context: EdgeContext; account: EdgeAccount }) => {
  const { execute, data, error, status } = usePinLoginEnabled(context, { username: account.username })
  const changePin = useChangePin(account)

  if (status === 'error') return <ListGroupItem>Error: {(error as Error).message}</ListGroupItem>
  if (status === 'idle' || status === 'loading') return <ListGroupItem>Loading...</ListGroupItem>

  return (
    <ListGroupItem>
      Pin Login: {String(data)}
      <Form>
        <FormGroup>
          <Form.Check
            type={'switch'}
            checked={data as any}
            label={'Pin Login Enabled'}
            id={'pinLoginEnabled'}
            disabled={changePin.status === 'loading'}
            onChange={() => changePin.execute({ options: { enableLogin: !data } as any }).then(() => execute())}
          />
        </FormGroup>
      </Form>
    </ListGroupItem>
  )
}

const CurrencySettings = ({ account }: { account: EdgeAccount }) => {
  useEdgeAccount(account)
  const currencyInfos = getCurrencyInfos(account)

  return (
    <ListGroup>
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
  const currencyCode = currencyInfo.currencyCode as keyof EdgeCurrencySettings
  const { read, write } = useCurrencySetting(account, { currencyCode })

  React.useEffect(() => {
    console.log({ read: read.promise })
  }, [read.status])

  if (read.error) return <div>Error: {read.error.message}</div>
  if (!read.data) return <div>Loading...</div>

  const onSelect = (denomination: EdgeDenomination) =>
    write
      .execute({ data: { ...read.data, displayDenominationMultiplier: denomination.multiplier } })
      .then(() => read.execute())

  const { displayDenominationMultiplier } = read.data
  const { displayName, denominations, symbolImage } = currencyInfo
  const selectedDenomination = currencyInfo.denominations.find(
    ({ multiplier }) => multiplier === displayDenominationMultiplier,
  )
  const displayDenomination = selectedDenomination || denominations[0]

  return (
    <ListGroupItem>
      {currencyCode}:
      <ListGroup>
        <ListGroupItem>
          <Image src={symbolImage} />
        </ListGroupItem>
        <ListGroupItem>Name: {displayName}</ListGroupItem>
        <ListGroupItem>
          Denomination:
          {'{'}
          name: {displayDenomination.name}, multiplier: {displayDenomination.multiplier}, symbol:{' '}
          {displayDenomination.symbol}
          {'}'}
        </ListGroupItem>
        <Denominations
          denominations={denominations}
          onSelect={onSelect}
          selectedDenominationMultiplier={displayDenomination.multiplier}
        />
      </ListGroup>
    </ListGroupItem>
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
  <ListGroupItem>
    Denominations:
    <ListGroup>
      {denominations.map((denomination) => (
        <Denomination
          key={denomination.name}
          denomination={denomination}
          onSelect={onSelect}
          isSelected={denomination.multiplier === selectedDenominationMultiplier}
        />
      ))}
    </ListGroup>
  </ListGroupItem>
)

const Denomination: React.FC<{
  denomination: EdgeDenomination
  onSelect: (denomination: EdgeDenomination) => any
  isSelected: boolean
}> = ({ denomination, onSelect, isSelected }) => (
  <ListGroupItem onClick={() => onSelect(denomination)} variant={isSelected ? 'primary' : undefined}>
    denomination: {denomination.name}, {denomination.multiplier}, {denomination.symbol}
  </ListGroupItem>
)
