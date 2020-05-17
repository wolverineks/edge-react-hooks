import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeCurrencyWallet, EdgeCurrencyCodeOptions, EdgeReceiveAddress } from '../../types'

export const useReceiveAddressAndEncodeUri = (
  wallet: EdgeCurrencyWallet,
  nativeAmount: string,
  options?: EdgeCurrencyCodeOptions,
) => {
  const { onSuccess, onError, data: [receiveAddress, uri] = [], pending, error } = useAsync<
    [EdgeReceiveAddress, string]
  >({ pending: true })

  React.useEffect(() => {
    const receiveAddress = wallet.getReceiveAddress(options)
    const encodedUri = receiveAddress.then((receiveAddress) =>
      wallet.encodeUri({
        publicAddress: receiveAddress.publicAddress,
        nativeAmount: nativeAmount || '0',
      }),
    )

    Promise.all([receiveAddress, encodedUri]).then(onSuccess).catch(onError)
  }, [nativeAmount, onError, onSuccess, options, wallet])

  return {
    error,
    pending,
    receiveAddress,
    uri,
  }
}
