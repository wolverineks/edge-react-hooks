// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useCancelOtpReset = () => {
  const { onStart, onSuccess, onError, pending, error } = useAsync()

  const cancelOtpReset = (account: EdgeAccount) => {
    onStart()
    return account
      .cancelOtpReset()
      .then(onSuccess)
      .catch(onError)
  }

  return {
    cancelOtpReset,
    error,
    pending,
  }
}
