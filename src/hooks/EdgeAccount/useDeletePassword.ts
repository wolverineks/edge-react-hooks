import * as React from 'react'
import { useAsync } from 'react-use-async'

import { EdgeAccount } from '../../types'

export const useDeletePassword = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const deletePassword = React.useCallback(
    (...args: Parameters<EdgeAccount['deletePassword']>) => {
      onStart()
      account
        .deletePassword(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [account, onError, onStart, onSuccess],
  )

  return {
    deletePassword,
    error,
    pending,
    reset,
  }
}
