// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useListWalletIds = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const listWalletIds = (account: EdgeAccount) => {
    onStart()
    return Promise.resolve(account.listWalletIds())
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    listWalletIds,
    pending,
    reset,
    walletIds: data,
  }
}
