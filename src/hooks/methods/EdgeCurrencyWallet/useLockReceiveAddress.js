// @flow

import { type EdgeCurrencyWallet, type EdgeReceiveAddress } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useLockReceiveAddress = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()
  const lockReceiveAddress = (wallet: EdgeCurrencyWallet, receiveAddress: EdgeReceiveAddress) => {
    onStart()
    return wallet
      .lockReceiveAddress(receiveAddress)
      .then(onSuccess)
      .catch(onError)
  }

  return { lockReceiveAddress, ...rest }
}
