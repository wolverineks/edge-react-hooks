import * as React from 'react'
import { useCreateCurrencyWallet } from 'edge-react-hooks'

const onChange = (cb) => (event) => cb(event.currentTarget.value)

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
  const [type, setType] = React.useState < string > WALLET_TYPES[0].value
  const [name, setName] = React.useState < string > ''
  const [fiatCurrencyCode, setFiatCurrencyCode] = React.useState(FIAT_CURRENCY_CODES[0].value)

  const { createCurrencyWallet, pending, error } = useCreateCurrencyWallet()
  const onSubmit = () => createCurrencyWallet(account, type, { name, fiatCurrencyCode })

  return (
    <div>
      <h1>Create Wallet</h1>
      <div>
        <label htmlFor={'name'}>Name</label>
        <input id={'name'} disabled={pending} value={name} onChange={onChange(setName)} />

        <br />

        <label htmlFor={'type'}>Type</label>
        <select id={'type'} disabled={pending} onChange={onChange(setType)}>
          {WALLET_TYPES.map(({ display, value }) => (
            <option value={value} key={value}>
              {display} - {value}
            </option>
          ))}
        </select>

        <br />

        <label htmlFor={'fiatCurrencyCodes'}>FiatCurrencyCode</label>
        <select id={'fiatCurrencyCodes'} disabled={pending} onChange={onChange(setFiatCurrencyCode)}>
          {FIAT_CURRENCY_CODES.map(({ display, value }) => (
            <option value={value} key={value}>
              {display}
            </option>
          ))}
        </select>

        <br />

        <button disabled={pending} onClick={onSubmit}>
          {pending ? '...' : 'Create'}
        </button>

        {error && <div>{error.message}</div>}
      </div>
    </div>
  )
}
