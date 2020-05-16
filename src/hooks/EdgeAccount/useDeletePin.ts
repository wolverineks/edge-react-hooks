import * as React from 'react'
import { useAsync } from 'react-use-async'

import { EdgeAccount } from '../../types'

export const useDeletePin = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const deletePin = React.useCallback(
    (...args: Parameters<EdgeAccount['deletePin']>) => {
      onStart()
      account
        .deletePin(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [account, onError, onStart, onSuccess],
  )

  return {
    deletePin,
    error,
    pending,
    reset,
  }
}
