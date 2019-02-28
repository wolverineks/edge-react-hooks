// @flow

import { type EdgeCurrencyWallet, type EdgeReceiveAddress } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useLockReceiveAddress = () => {
  const { onStart, onSuccess, onError, pending, error } = useAsync()
  const lockReceiveAddress = (wallet: EdgeCurrencyWallet, receiveAddress: EdgeReceiveAddress) => {
    onStart()
    return wallet
      .lockReceiveAddress(receiveAddress)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    lockReceiveAddress,
    pending,
  }
}
