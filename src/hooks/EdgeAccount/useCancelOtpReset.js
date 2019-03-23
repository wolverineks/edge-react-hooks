// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useCancelOtpReset = () => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const cancelOtpReset = (account: EdgeAccount) => {
    onStart()
    account
      .cancelOtpReset()
      .then(onSuccess)
      .catch(onError)
  }

  return {
    cancelOtpReset,
    error,
    pending,
    reset,
  }
}
