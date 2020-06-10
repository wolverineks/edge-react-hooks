import { EdgeAccount } from 'edge-core-js'
import { useCreateCurrencyWallet, useEdgeAccount } from 'edge-react-hooks'
import * as React from 'react'
import { Alert, Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'

import { Select } from '../Components/Select'
import { fiatCurrencyInfos } from '../utils/fiatInfos'
import { useDefaultFiatCurrencyCode } from '../utils/hooks'
import { getFiatInfo, getWalletTypes } from '../utils/utils'

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

      <Select
        title={'Type'}
        disabled={pending}
        onSelect={(event) => setType(event.currentTarget.value)}
        options={walletTypes}
        renderOption={({ display, type, currencyCode }) => (
          <option value={type} key={type}>
            {currencyCode} - {display}
          </option>
        )}
      />

      <Select
        title={'FiatCurrencyCode'}
        disabled={pending}
        defaultValue={defaultFiatInfo?.isoCurrencyCode}
        onSelect={(event) => setFiatCurrencyCode(event.currentTarget.value)}
        options={
          defaultFiatInfo
            ? [
                defaultFiatInfo,
                ...fiatCurrencyInfos.filter(({ currencyCode }) => currencyCode !== defaultFiatInfo.currencyCode),
              ]
            : fiatCurrencyInfos
        }
        renderOption={({ isoCurrencyCode, currencyCode, symbol }) => (
          <option value={isoCurrencyCode} key={isoCurrencyCode}>
            {symbol} - {currencyCode}
          </option>
        )}
      />

      <Button variant={'primary'} disabled={pending} onClick={onSubmit}>
        {pending ? '...' : 'Create'}
      </Button>
      {error && <Alert variant={'danger'}>{error.message}</Alert>}
    </Form>
  )
}
