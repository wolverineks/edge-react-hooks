// @flow

import { type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useRequestOtpReset = () => {
  const { onStart, onSuccess, onError, pending, error, data } = useAsync()

  const requestOtpReset = (context: EdgeContext, username: string, otpResetToken: string) => {
    onStart()
    return context
      .requestOtpReset(username, otpResetToken)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    pending,
    requestOtpReset,
    resetDate: (data: ?Date),
  }
}
