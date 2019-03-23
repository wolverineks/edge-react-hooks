// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useGetWalletInfo = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const getWalletInfo = (account: EdgeAccount, id: string) => {
    onStart()
    Promise.resolve(account.getWalletInfo(id))
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    getWalletInfo,
    pending,
    reset,
    walletInfo: data,
  }
}
