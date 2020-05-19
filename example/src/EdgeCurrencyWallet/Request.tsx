import { EdgeCurrencyWallet } from 'edge-core-js'
import { useReceiveAddressAndEncodeUri } from 'edge-react-hooks'
import QRCode from 'qrcode.react'
import * as React from 'react'

const onChange = (cb: Function) => (event: React.SyntheticEvent<HTMLInputElement>) => cb(event.currentTarget.value)

export const Request: React.FC<{ wallet: EdgeCurrencyWallet }> = ({ wallet }) => {
  const [nativeAmount, setNativeAmount] = React.useState<string>('')
  const { uri, receiveAddress, error } = useReceiveAddressAndEncodeUri(wallet, { nativeAmount })

  return (
    <div>
      <h1>Request</h1>

      <div>
        <label>To: {receiveAddress && receiveAddress.publicAddress}</label>
      </div>

      <div>
        <label>
          Amount: <input onChange={onChange(setNativeAmount)} value={nativeAmount} placeholder={'0'} />
        </label>

        {error && <div>{error.message}</div>}
      </div>

      <div>
        <QRCode value={uri || ''} />
      </div>
    </div>
  )
}
