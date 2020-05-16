import * as React from 'react'
import { useAsync } from 'react-use-async'

import { EdgeAccount } from '../../types'

export const useSignEthereumTransaction = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const signEthereumTransaction = React.useCallback(
    (...args: Parameters<EdgeAccount['signEthereumTransaction']>) => {
      onStart()
      account
        .signEthereumTransaction(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [account, onError, onStart, onSuccess],
  )

  return {
    data,
    error,
    pending,
    reset,
    signEthereumTransaction,
  }
}
