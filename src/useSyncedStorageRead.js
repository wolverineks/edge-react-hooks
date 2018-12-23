// @flow

import { type EdgeAccount, type EdgeCurrencyWallet } from 'edge-core-js'
import { useEffect, useReducer } from 'react'

export type Stringifyable = string | number | { [string]: Stringifyable } | Array<Stringifyable>

type ReadStart = {| type: 'READ_START' |}
type ReadSuccess = {| data: Stringifyable, type: 'READ_SUCCESS' |}
type ReadError = {| error: Error, type: 'READ_ERROR' |}
type Action = ReadStart | ReadSuccess | ReadError

type State = {| data: Stringifyable | null, error: Error | null, pending: boolean |}

const initialState: State = { data: null, error: null, pending: false }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'READ_START': {
      return { ...state, pending: true, error: null }
    }
    case 'READ_SUCCESS': {
      return { ...state, pending: false, data: action.data }
    }
    case 'READ_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useSyncedStorageRead = (
  storageContext: EdgeAccount | EdgeCurrencyWallet | null | void,
  path: string | null | void
) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const effect = () => {
    if (!storageContext || !path) return // mount with null
    dispatch({ type: 'READ_START' })
    storageContext.disklet
      .getText(path)
      .then((data: string) => dispatch({ type: 'READ_SUCCESS', data: JSON.parse(data) }))
      .catch((error: Error) => dispatch({ type: 'READ_ERROR', error })) // mount with storageContext / null -> storageContext / storageContextA -> storageContextB

    const unsubscribe = storageContext.watch(
      'disklet',
      (disklet: $PropertyType<EdgeAccount | EdgeCurrencyWallet, 'disklet'>) => {
        if (!storageContext || !path) return
        disklet
          .getText(path)
          .then((data: string) => dispatch({ type: 'READ_SUCCESS', data: JSON.parse(data) }))
          .catch((error: Error) => dispatch({ type: 'READ_ERROR', error }))
      }
    )
    return unsubscribe // unmount with storageContext / storageContextA -> storageContextB (1) / storageContext -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [storageContext]) // onUpdate

  return state
}