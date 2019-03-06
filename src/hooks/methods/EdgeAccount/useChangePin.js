// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useChangePin = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const changePin = (account: EdgeAccount, options: { enableLogin?: boolean, pin?: string }) => {
    onStart()
    return account
      .changePin(options)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    changePin,
    error,
    pending,
    pin: (data: ?string),
    reset,
  }
}
