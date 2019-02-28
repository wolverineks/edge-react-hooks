// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useEnableOtp = () => {
  const { onStart, onSuccess, onError, pending, error } = useAsync()

  const enableOtp = (account: EdgeAccount, timeout?: number) => {
    onStart()
    return account
      .enableOtp(timeout)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    enableOtp,
    error,
    pending,
  }
}
