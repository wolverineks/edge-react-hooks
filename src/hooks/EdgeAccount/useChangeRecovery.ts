import { EdgeAccount } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useChangeRecovery = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync<string>()

  const changeRecovery = React.useCallback(
    (...args: Parameters<EdgeAccount['changeRecovery']>) => {
      onStart()
      account
        .changeRecovery(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [account, onError, onStart, onSuccess],
  )

  return {
    changeRecovery,
    error,
    pending,
    recovery: data,
    reset,
  }
}
