// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useCheckPin = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const checkPin = (account: EdgeAccount, pin: string) => {
    onStart()
    return account
      .checkPin(pin)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    checkPin,
    error,
    pending,
    pinVerified: (data: ?boolean),
    reset,
  }
}
