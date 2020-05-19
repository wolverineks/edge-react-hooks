import { EdgeAccount } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useCreateWallet = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync<string>()

  const createWallet = React.useCallback(
    (...args: Parameters<EdgeAccount['createWallet']>) => {
      onStart()
      account
        .createWallet(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [account, onError, onStart, onSuccess],
  )

  return {
    createWallet,
    data,
    error,
    pending,
    reset,
  }
}
