import { EdgeContext } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useRequestOtpReset = (context: EdgeContext) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync<Date>()

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
    resetDate: data,
    requestOtpReset,
    error,
    pending,
    reset,
  }
}
