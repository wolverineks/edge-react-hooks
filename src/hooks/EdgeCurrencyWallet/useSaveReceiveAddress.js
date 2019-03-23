// @flow

import { type EdgeCurrencyWallet, type EdgeReceiveAddress } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useSaveReceiveAddress = () => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const saveReceiveAddress = (wallet: EdgeCurrencyWallet, receiveAddress: EdgeReceiveAddress) => {
    onStart()
    return wallet
      .saveReceiveAddress(receiveAddress)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    pending,
    reset,
    saveReceiveAddress,
  }
}
