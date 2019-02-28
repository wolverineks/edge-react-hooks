// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useGetFirstWalletInfo = () => {
  const { onStart, onSuccess, onError, pending, error, data } = useAsync()

  const getFirstWalletInfo = (account: EdgeAccount, type: string) => {
    onStart()
    return Promise.resolve(account.getFirstWalletInfo(type))
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    getFirstWalletInfo,
    pending,
    walletInfo: data,
  }
}
