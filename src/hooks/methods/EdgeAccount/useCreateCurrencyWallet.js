// @flow

import { type EdgeAccount, type EdgeCreateCurrencyWalletOptions, type EdgeCurrencyWallet } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useCreateCurrencyWallet = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const createCurrencyWallet = (account: EdgeAccount, type: string, options?: EdgeCreateCurrencyWalletOptions) => {
    onStart()
    return account
      .createCurrencyWallet(type, options)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    createCurrencyWallet,
    error,
    pending,
    reset,
    wallet: (data: ?EdgeCurrencyWallet),
  }
}
