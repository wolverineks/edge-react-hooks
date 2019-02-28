// @flow

import { type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useRequestOtpReset = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const requestOtpReset = (context: EdgeContext, username: string, otpResetToken: string) => {
    onStart()
    return context
      .requestOtpReset(username, otpResetToken)
      .then(onSuccess)
      .catch(onError)
  }

  return { requestOtpReset, ...rest }
}
