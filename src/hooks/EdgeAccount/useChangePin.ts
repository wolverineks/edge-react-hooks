import * as React from 'react'
import { useAsync } from 'react-use-async'

import { EdgeAccount } from '../../types'

export const useChangePin = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const changePin = React.useCallback(
    (options: Parameters<EdgeAccount['changePin']>[0]) => {
      onStart()
      account.changePin(options).then(onSuccess).catch(onError)
    },
    [account, onError, onStart, onSuccess],
  )

  return {
    changePin,
    error,
    pending,
    pin: data,
    reset,
  }
}
