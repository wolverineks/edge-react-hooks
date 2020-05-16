import * as React from 'react'
import { useAsync } from 'react-use-async'

import { EdgeAccount } from '../../types'

export const useDeleteRecovery = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const deleteRecovery = React.useCallback(
    (...args: Parameters<EdgeAccount['deleteRecovery']>) => {
      onStart()
      account
        .deleteRecovery(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [account, onError, onStart, onSuccess],
  )

  return {
    deleteRecovery,
    error,
    pending,
    reset,
  }
}
