// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useSplitWalletInfo = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const splitWalletInfo = (account: EdgeAccount, id: string, newWalletType: string) => {
    onStart()
    return account
      .splitWalletInfo(id, newWalletType)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    data: data,
    error,
    pending,
    reset,
    splitWalletInfo,
  }
}
