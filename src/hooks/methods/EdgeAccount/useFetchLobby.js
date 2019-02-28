// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useFetchLobby = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const fetchLobby = (account: EdgeAccount, lobbyId: string) => {
    onStart()
    return account
      .fetchLobby(lobbyId)
      .then(onSuccess)
      .catch(onError)
  }

  return { fetchLobby, ...rest }
}
