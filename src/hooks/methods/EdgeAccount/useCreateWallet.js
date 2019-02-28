// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useCreateWallet = () => {
  const { onStart, onSuccess, onError, pending, error, data } = useAsync()

  const createWallet = (account: EdgeAccount, type: string, keys: any) => {
    onStart()
    return account
      .createWallet(type, keys)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    createWallet,
    data: (data: ?string),
    error,
    pending,
  }
}
