import { EdgeAccount } from 'edge-core-js'
import { useCreateCurrencyWallet, useEdgeAccount } from 'edge-react-hooks'
import * as React from 'react'
import { Alert, Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'

import { getWalletTypes } from '../utils'

const onChange = (cb: Function) => (event: any) => cb(event.currentTarget.value)

const FIAT_CURRENCY_CODES = [
  { value: 'iso:USD', display: 'US Dollars' },
  { value: 'iso:EUR', display: 'Euros' },
  { value: 'iso:CAD', display: 'Canadian Dollars' },
]

export const CreateWallet: React.FC<{ account: EdgeAccount }> = ({ account }) => {
  useEdgeAccount(account)

  const walletTypes = getWalletTypes(account)

  const [type, setType] = React.useState<string>(walletTypes[0].type)
  const [name, setName] = React.useState<string>('')
  const [fiatCurrencyCode, setFiatCurrencyCode] = React.useState(FIAT_CURRENCY_CODES[0].value)

  const { execute: createCurrencyWallet, error, status } = useCreateCurrencyWallet(account)
  const pending = status === 'loading'
  const onSubmit = () => createCurrencyWallet({ type, options: { name, fiatCurrencyCode } })

  return (
    <Form>
      <FormGroup>
        <FormLabel>Name</FormLabel>
        <FormControl id={'name'} disabled={pending} value={name} onChange={onChange(setName)} />
      </FormGroup>

      <FormGroup>
        <FormLabel>Type</FormLabel>
        <FormControl as="select" id={'type'} disabled={pending} onChange={onChange(setType)}>
          {walletTypes.map(({ display, type, currencyCode }) => (
            <option value={type} key={type}>
              {currencyCode} - {display}
            </option>
          ))}
        </FormControl>
      </FormGroup>

      <FormGroup>
        <FormLabel>FiatCurrencyCode</FormLabel>
        <FormControl as="select" id={'fiatCurrencyCodes'} disabled={pending} onChange={onChange(setFiatCurrencyCode)}>
          {FIAT_CURRENCY_CODES.map(({ display, value }) => (
            <option value={value} key={value}>
              {display}
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
