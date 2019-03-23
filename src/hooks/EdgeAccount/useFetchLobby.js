// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useFetchLobby = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const fetchLobby = (account: EdgeAccount, lobbyId: string) => {
    onStart()
    account
      .fetchLobby(lobbyId)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    fetchLobby,
    lobby: data,
    pending,
    reset,
  }
}
