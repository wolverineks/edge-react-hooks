import { type EdgeCurrencyCodeOptions, type EdgeCurrencyWallet, type EdgeReceiveAddress } from 'edge-core-js'
import QRCode from 'qrcode.react'
import * as React from 'react'
import { useAsync } from 'react-use-async'

const onChange = (cb) => (event: SyntheticInputEvent<HTMLInputElement>) => cb(event.currentTarget.value)

export const Request: React.FC<{ wallet: EdgeCurrencyWallet }> = ({ wallet }) => {
  const [nativeAmount, setNativeAmount] = React.useState < string > '0'
  const { uri, receiveAddress, error } = useReceiveAddressAndEncodeUri(wallet, nativeAmount)

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

export const useGetReceiveAddress = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const getReceiveAddress = (wallet: EdgeCurrencyWallet, options?: EdgeCurrencyCodeOptions) => {
    onStart()
    return wallet.getReceiveAddress(options).then(onSuccess, onError)
  }

  return {
    error,
    getReceiveAddress,
    pending,
    receiveAddress: (data: ?EdgeReceiveAddress),
    reset,
  }
}

const useReceiveAddressAndEncodeUri = (
  wallet: EdgeCurrencyWallet,
  nativeAmount: string,
  options: ?EdgeCurrencyCodeOptions,
) => {
  const { onStart, onSuccess, onError, data: [receiveAddress, uri] = [], pending, error } = useAsync()

  React.useEffect(() => {
    onStart()
    const receiveAddress = wallet.getReceiveAddress(options)
    const encodedUri = receiveAddress.then((receiveAddress) =>
      wallet.encodeUri({
        publicAddress: receiveAddress.publicAddress,
        nativeAmount: nativeAmount || '0',
      }),
    )

    Promise.all([receiveAddress, encodedUri]).then(onSuccess).catch(onError)
  }, [nativeAmount, onError, onStart, onSuccess, options, wallet])

  return {
    error,
    pending,
    receiveAddress,
    uri,
  }
}
