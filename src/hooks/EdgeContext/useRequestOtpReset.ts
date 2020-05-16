import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeContext } from '../../types'

export const useRequestOtpReset = (context: EdgeContext) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const requestOtpReset = React.useCallback(
    (...args: Parameters<EdgeContext['requestOtpReset']>) => {
      onStart()
      context
        .requestOtpReset(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [context, onError, onStart, onSuccess],
  )

  return {
    account: data,
    requestOtpReset,
    error,
    pending,
    reset,
  }
}
