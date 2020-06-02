import { EdgeAccount } from 'edge-core-js'
import { useCreateCurrencyWallet, useEdgeAccount } from 'edge-react-hooks'
import * as React from 'react'
import { Alert, Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'

import { fiatCurrencyInfos, getFiatInfo, getWalletTypes, useDefaultFiatCurrencyCode } from '../utils'

export const CreateWallet: React.FC<{ account: EdgeAccount }> = ({ account }) => {
  useEdgeAccount(account)
  const walletTypes = getWalletTypes(account)

  const [type, setType] = React.useState<string>(walletTypes[0].type)
  const [name, setName] = React.useState<string>('')
  const [fiatCurrencyCode, setFiatCurrencyCode] = React.useState<string>('')

  const { execute: createCurrencyWallet, error, status } = useCreateCurrencyWallet(account)
  const pending = status === 'loading'

  const { read } = useDefaultFiatCurrencyCode(account)
  if (read.error) return <div>Error: {read.error.message}</div>
  if (!read.data) return <div>Default Fiat: Loading...</div>

  const onSubmit = () => createCurrencyWallet({ type, options: { name, fiatCurrencyCode } })
  const defaultFiatInfo = getFiatInfo({ currencyCode: read.data })

  return (
    <Form>
      <FormGroup>
        <FormLabel>Name</FormLabel>
        <FormControl
          id={'name'}
          disabled={pending}
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>Type</FormLabel>
        <FormControl
          as="select"
          id={'type'}
          disabled={pending}
          onChange={(event) => setType(event.currentTarget.value)}
        >
          {walletTypes.map(({ display, type, currencyCode }) => (
            <option value={type} key={type}>
              {currencyCode} - {display}
            </option>
          ))}
        </FormControl>
      </FormGroup>

      <FormGroup>
        <FormLabel>FiatCurrencyCode</FormLabel>
        <FormControl
          as="select"
          id={'fiatCurrencyCodes'}
          disabled={pending}
          onChange={(event) => setFiatCurrencyCode(event.currentTarget.value)}
          defaultValue={defaultFiatInfo?.isoCurrencyCode}
        >
          {defaultFiatInfo && (
            <option key={defaultFiatInfo.isoCurrencyCode} value={defaultFiatInfo.isoCurrencyCode}>
              {defaultFiatInfo.symbol} - {defaultFiatInfo.currencyCode}
            </option>
          )}
          {fiatCurrencyInfos.map(({ isoCurrencyCode, currencyCode, symbol }) => (
            <option value={isoCurrencyCode} key={isoCurrencyCode}>
              {symbol} - {currencyCode}
            </option>
          ))}
        </FormControl>
      </FormGroup>

      <Button variant={'primary'} disabled={pending} onClick={onSubmit}>
        {pending ? '...' : 'Create'}
      </Button>
      {error && <Alert variant={'danger'}>{error.message}</Alert>}
    </Form>
  )
}
