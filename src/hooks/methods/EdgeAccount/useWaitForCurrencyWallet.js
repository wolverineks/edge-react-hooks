// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useWaitForCurrencyWallet = () => {
  const { onStart, onSuccess, onError, pending, error, data } = useAsync()

  const waitForCurrencyWallet = (account: EdgeAccount, id: string) => {
    onStart()
    return account
      .waitForCurrencyWallet(id)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    pending,
    waitForCurrencyWallet,
    wallet: data,
  }
}
