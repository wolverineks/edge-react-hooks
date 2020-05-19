import { EdgeCurrencyCodeOptions, EdgeCurrencyWallet, EdgeReceiveAddress } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useReceiveAddressAndEncodeUri = (
  wallet: EdgeCurrencyWallet,
  { nativeAmount, options }: { nativeAmount: string; options?: EdgeCurrencyCodeOptions },
) => {
  const { onSuccess, onError, data: [receiveAddress, uri] = [], pending, error } = useAsync<
    [EdgeReceiveAddress, string]
  >({ pending: true })

  React.useEffect(() => {
    const receiveAddress = wallet.getReceiveAddress(options)
    const encodeUri = receiveAddress.then(({ publicAddress }) =>
      wallet.encodeUri({
        publicAddress,
        nativeAmount: nativeAmount || '0',
      }),
    )

    Promise.all([receiveAddress, encodeUri]).then(onSuccess).catch(onError)
  }, [nativeAmount, onError, onSuccess, options, wallet])

  return {
    error,
    pending,
    receiveAddress,
    uri,
  }
}
