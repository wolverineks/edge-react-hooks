// @flow

import { type EdgeAccount, type EdgeLobby } from 'edge-core-js'
import { useReducer } from 'react'

type FetchLobbyStart = {| type: 'FETCH_LOBBY_START' |}
type FetchLobbySuccess = {| lobby: EdgeLobby, type: 'FETCH_LOBBY_SUCCESS' |}
type FetchLobbyError = {| error: Error, type: 'FETCH_LOBBY_ERROR' |}

type Action = FetchLobbyStart | FetchLobbySuccess | FetchLobbyError

type State = {| error: Error | null, lobby: EdgeLobby | null, pending: boolean |}

const initialState: State = { pending: false, error: null, lobby: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FETCH_LOBBY_START': {
      return { ...state, pending: true, error: null, lobby: null }
    }
    case 'FETCH_LOBBY_SUCCESS': {
      return { ...state, pending: false, lobby: action.lobby }
    }
    case 'FETCH_LOBBY_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useFetchLobby = (account: ?EdgeAccount, lobbyId: string) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchLobby = () => {
    if (!account || !account.loggedIn) return
    dispatch({ type: 'FETCH_LOBBY_START' })
    account
      .fetchLobby(lobbyId)
      .then((lobby: EdgeLobby) => dispatch({ type: 'FETCH_LOBBY_SUCCESS', lobby }))
      .catch((error: Error) => dispatch({ type: 'FETCH_LOBBY_ERROR', error }))
  }

  return { ...state, fetchLobby }
}
