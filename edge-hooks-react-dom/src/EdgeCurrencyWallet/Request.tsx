import { EdgeCurrencyWallet } from 'edge-core-js'
import { useEdgeCurrencyWallet, useReceiveAddressAndEncodeUri } from 'edge-react-hooks'
import QRCode from 'qrcode.react'
import * as React from 'react'
import { Alert, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import JSONPretty from 'react-json-pretty'

import { getCurrencyCodes } from '../utils'

export const Request: React.FC<{ wallet: EdgeCurrencyWallet }> = ({ wallet }) => {
  useEdgeCurrencyWallet(wallet)

  const [nativeAmount, setNativeAmount] = React.useState('')
  const [currencyCode, setCurrencyCode] = React.useState('')
  const currencyCodes = getCurrencyCodes(wallet)

  const { data, error } = useReceiveAddressAndEncodeUri(wallet, {
    nativeAmount,
    options: { currencyCode },
  })

  return (
    <Form>
      <FormGroup>
        <FormLabel>To:</FormLabel>
        <FormControl value={data?.receiveAddress.publicAddress || ''} readOnly />
      </FormGroup>

      <FormGroup>
        <FormLabel>Amount:</FormLabel>
        <FormControl value={nativeAmount} onChange={(event) => setNativeAmount(event.currentTarget.value)} />

        {error && <Alert variant={'danger'}>{error.message}</Alert>}
      </FormGroup>

      <FormGroup>
        <FormLabel>CurrencyCode:</FormLabel>
        <FormControl
          as={'select'}
          value={currencyCode}
          onChange={(event) => setCurrencyCode(event.currentTarget.value)}
        >
          {currencyCodes.map((currencyCode) => (
            <option key={currencyCode} value={currencyCode}>
              {currencyCode}
            </option>
          ))}
        </FormControl>
      </FormGroup>

      <FormGroup>
        <QRCode value={data?.uri || ''} />
      </FormGroup>

      {error && <Alert variant={'danger'}>{error.message}</Alert>}
      <JSONPretty
        json={{
          nativeAmount,
          currencyCodeOptions: { currencyCode },
          uri: data?.uri,
          receiveAddress: data?.receiveAddress,
        }}
      />
    </Form>
  )
}
