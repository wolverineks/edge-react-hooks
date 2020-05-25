import { EdgeCurrencyWallet } from 'edge-core-js'
import { useReceiveAddressAndEncodeUri } from 'edge-react-hooks'
import QRCode from 'qrcode.react'
import * as React from 'react'
import { Alert, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'

export const Request: React.FC<{ wallet: EdgeCurrencyWallet }> = ({ wallet }) => {
  const [nativeAmount, setNativeAmount] = React.useState<string>('')
  const { uri, receiveAddress, error } = useReceiveAddressAndEncodeUri(wallet, { nativeAmount })

  return (
    <Form>
      <FormGroup>
        <FormLabel>To:</FormLabel>
        <FormControl value={receiveAddress && receiveAddress.publicAddress} />
      </FormGroup>

      <FormGroup>
        <FormLabel>Amount:</FormLabel>
        <FormControl value-={nativeAmount} onChange={(event) => setNativeAmount(event.currentTarget.value)} />

        {error && <Alert variant={'danger'}>{(error as Error).message}</Alert>}
      </FormGroup>

      <FormGroup>
        <QRCode value={uri || ''} />
      </FormGroup>
    </Form>
  )
}
