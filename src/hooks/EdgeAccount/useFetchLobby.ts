import * as React from 'react'
import { useAsync } from 'react-use-async'

import { EdgeAccount } from '../../types'

export const useFetchLobby = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const fetchLobby = React.useCallback(
    (...args: Parameters<EdgeAccount['fetchLobby']>) => {
      onStart()
      account
        .fetchLobby(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [account, onError, onStart, onSuccess],
  )

  return {
    error,
    fetchLobby,
    lobby: data,
    pending,
    reset,
  }
}
