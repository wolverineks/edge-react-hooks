// @flow

import { type EdgeCurrencyCodeOptions, type EdgeCurrencyWallet, type EdgeReceiveAddress } from 'edge-core-js'
import { useEncodeUri } from 'edge-react-hooks'
import QRCode from 'qrcode.react'
import React, { useEffect, useState } from 'react'
import { useAsync } from 'react-use-async'

export const Request = ({ wallet }: { wallet: EdgeCurrencyWallet }) => {
  const [nativeAmount, setNativeAmount] = useState<string>('')
  const { uri, receiveAddress, error } = useReceiveAddressAndEncodeUri(wallet, nativeAmount)

  return (
    <div>
      <h1>Request</h1>

      <div>
        <label>To: {receiveAddress && receiveAddress.publicAddress}</label>
      </div>

      <div>
        <label>
          {error && error.message}
          Amount:{' '}
          <input
            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => setNativeAmount(event.currentTarget.value)}
            value={nativeAmount}
            placeholder={'0'}
          />
        </label>
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
    return wallet
      .getReceiveAddress(options)
      .then(data => onSuccess(data) || data)
      .catch(onError)
  }

  return {
    error,
    getReceiveAddress,
    pending,
    receiveAddress: (data: ?EdgeReceiveAddress),
    reset,
  }
}

const useReceiveAddressAndEncodeUri = (wallet, nativeAmount) => {
  const { onStart, onSuccess, onError, data, pending, error } = useAsync()

  useEffect(() => {
    onStart()
    const receiveAddress = wallet.getReceiveAddress()
    const encodedUri = receiveAddress.then(receiveAddress =>
      wallet.encodeUri({
        publicAddress: receiveAddress.publicAddress,
        nativeAmount: nativeAmount || '0',
      }),
    )

    Promise.all([receiveAddress, encodedUri])
      .then(onSuccess)
      .catch(onError)
  }, [wallet, nativeAmount])

  return {
    error,
    pending,
    receiveAddress: (data && data[0]) || void 0,
    uri: (data && data[1]) || void 0,
  }
}
