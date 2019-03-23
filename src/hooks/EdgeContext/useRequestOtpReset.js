// @flow

import { type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useRequestOtpReset = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const requestOtpReset = (context: EdgeContext, username: string, otpResetToken: string) => {
    onStart()
    context
      .requestOtpReset(username, otpResetToken)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    pending,
    requestOtpReset,
    reset,
    resetDate: data,
  }
}
