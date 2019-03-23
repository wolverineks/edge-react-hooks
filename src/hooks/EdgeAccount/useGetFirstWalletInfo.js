// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useGetFirstWalletInfo = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const getFirstWalletInfo = (account: EdgeAccount, type: string) => {
    onStart()
    Promise.resolve(account.getFirstWalletInfo(type))
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    getFirstWalletInfo,
    pending,
    reset,
    walletInfo: data,
  }
}
