import { EdgeAccount, EdgeLobby } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useLobby = (account: EdgeAccount, { lobbyId }: { lobbyId: string }) => {
  const { onSuccess, onError, pending, error, data } = useAsync<EdgeLobby>({ pending: true })

  React.useEffect(() => {
    account.fetchLobby(lobbyId).then(onSuccess).catch(onError)
  }, [account, lobbyId, onError, onSuccess])

  return {
    error,
    lobby: data,
    pending,
  }
}
