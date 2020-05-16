import * as React from 'react'
import { useAsync } from 'react-use-async'

import { EdgeAccount } from '../../types'

export const useCancelOtpReset = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const cancelOtpReset = React.useCallback(
    (...args: Parameters<EdgeAccount['cancelOtpReset']>) => {
      onStart()
      account
        .cancelOtpReset(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [account, onStart, onSuccess, onError],
  )

  return {
    cancelOtpReset,
    error,
    pending,
    reset,
  }
}
