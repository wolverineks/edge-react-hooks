import { EdgeAccount } from 'edge-core-js'
import { useCreateCurrencyWallet } from 'edge-react-hooks'
import * as React from 'react'
import { Alert, Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'

const onChange = (cb: Function) => (event: any) => cb(event.currentTarget.value)

const WALLET_TYPES = [
  { value: 'wallet:bitcoin', display: 'Bitcoin' },
  { value: 'wallet:ethereum', display: 'Ethereum' },
  { value: 'wallet:dash', display: 'Dash' },
  { value: 'wallet:monero', display: 'Monero' },
]

const FIAT_CURRENCY_CODES = [
  { value: 'iso:USD', display: 'US Dollars' },
  { value: 'iso:EUR', display: 'Euros' },
  { value: 'iso:CAD', display: 'Canadian Dollars' },
]

export const CreateWallet: React.FC<{ account: EdgeAccount }> = ({ account }) => {
  const [type, setType] = React.useState<string>(WALLET_TYPES[0].value)
  const [name, setName] = React.useState<string>('')
  const [fiatCurrencyCode, setFiatCurrencyCode] = React.useState(FIAT_CURRENCY_CODES[0].value)

  const { createCurrencyWallet, pending, error } = useCreateCurrencyWallet(account)
  const onSubmit = () => createCurrencyWallet({ type, options: { name, fiatCurrencyCode } })

  return (
    <Form>
      <FormGroup controlId={'name'}>
        <FormLabel>Name</FormLabel>
        <FormControl id={'name'} disabled={pending} value={name} onChange={onChange(setName)} />
      </FormGroup>

      <FormGroup controlId={'type'}>
        <FormLabel>Type</FormLabel>
        <FormControl as="select" id={'type'} disabled={pending} onChange={onChange(setType)}>
          {WALLET_TYPES.map(({ display, value }) => (
            <option value={value} key={value}>
              {display} - {value}
            </option>
          ))}
        </FormControl>
      </FormGroup>

      <FormGroup controlId={'fiatCurrencyCodes'}>
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
      {error && <Alert variant={'danger'}>{(error as Error).message}</Alert>}
    </Form>
  )
}
