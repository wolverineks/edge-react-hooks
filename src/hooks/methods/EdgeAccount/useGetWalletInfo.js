// @flow

import { type EdgeAccount, type EdgeWalletInfo } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useGetWalletInfo = () => {
  const { onStart, onSuccess, onError, pending, error, data } = useAsync()

  const getWalletInfo = (account: EdgeAccount, id: string) => {
    onStart()
    return Promise.resolve(account.getWalletInfo(id))
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    getWalletInfo,
    pending,
    walletInfo: (data: ?EdgeWalletInfo),
  }
}
