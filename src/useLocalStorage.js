// @flow

import { type EdgeAccount, type EdgeCurrencyWallet } from 'edge-core-js'
import { useEffect, useReducer } from 'react'

export type Stringifyable = string | number | { [string]: Stringifyable } | Array<Stringifyable>

type WRITE_START = {| type: 'WRITE_START' |}
type WRITE_SUCCESS = {| data: Stringifyable, type: 'WRITE_SUCCESS' |}
type WRITE_ERROR = {| error: Error, type: 'WRITE_ERROR' |}
type READ_START = {| type: 'READ_START' |}
type READ_SUCCESS = {| data: Stringifyable, type: 'READ_SUCCESS' |}
type READ_ERROR = {| error: Error, type: 'READ_ERROR' |}
type Action = WRITE_START | WRITE_SUCCESS | WRITE_ERROR | READ_START | READ_SUCCESS | READ_ERROR

type State = {
  data: Stringifyable | null,
  readError: Error | null,
  readPending: boolean,
  writeError: Error | null,
  writePending: boolean
}

const initialState: State = {
  data: null,
  writePending: false,
  writeError: null,
  readPending: false,
  readError: null
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'READ_START': {
      return { ...state, readPending: true, readError: null }
    }
    case 'WRITE_START': {
      return { ...state, writePending: true, writeError: null }
    }

    case 'READ_SUCCESS': {
      return { ...state, readPending: false, data: action.data }
    }
    case 'WRITE_SUCCESS': {
      return { ...state, writePending: false, data: action.data }
    }

    case 'WRITE_ERROR': {
      return { ...state, writePending: false, writeError: action.error }
    }
    case 'READ_ERROR': {
      return { ...state, readPending: false, readError: action.error }
    }
    default:
      return state
  }
}

export const useLocalStorage = (
  storageContext: EdgeAccount | EdgeCurrencyWallet | null | void,
  path: string | null | void
) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setData = (data: Stringifyable) => {
    if (!storageContext || !path) return
    dispatch({ type: 'WRITE_START' })
    storageContext.localDisklet
      .setText(path, JSON.stringify(data))
      .then(() => dispatch({ type: 'WRITE_SUCCESS', data }))
      .catch((error: Error) => dispatch({ type: 'WRITE_ERROR', error }))
  }

  const effect = () => {
    if (!storageContext || !path) return // mount with null
    dispatch({ type: 'READ_START' })
    storageContext.localDisklet
      .getText(path)
      .then((data: string) => dispatch({ type: 'READ_SUCCESS', data: JSON.parse(data) }))
      .catch((error: Error) => dispatch({ type: 'READ_ERROR', error })) // mount with storageContext / null -> storageContext / storageContextA -> storageContextB

    const unsubscribe = storageContext.watch(
      'localDisklet',
      (localDisklet: $PropertyType<EdgeAccount | EdgeCurrencyWallet, 'localDisklet'>) => {
        if (!storageContext || !path) return
        localDisklet
          .getText(path)
          .then((data: string) => dispatch({ type: 'READ_SUCCESS', data: JSON.parse(data) }))
          .catch((error: Error) => dispatch({ type: 'READ_ERROR', error }))
      }
    )
    return unsubscribe // unmount with storageContext / storageContextA -> storageContextB (1) / storageContext -> null
  }

  useEffect(effect, []) // onMount
  useEffect(effect, [storageContext]) // onUpdate

  return { ...state, setData }
}
