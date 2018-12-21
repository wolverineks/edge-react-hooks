// @flow

import { type EdgeCurrencyWallet, type EdgeDataDump } from 'edge-core-js'
import { useReducer } from 'react'

type READ_DATA_DUMP_START = {| type: 'READ_DATA_DUMP_START' |}
type READ_DATA_DUMP_SUCCESS = {| dataDump: EdgeDataDump, type: 'READ_DATA_DUMP_SUCCESS' |}
type READ_DATA_DUMP_ERROR = {| error: Error, type: 'READ_DATA_DUMP_ERROR' |}
type Action = READ_DATA_DUMP_START | READ_DATA_DUMP_SUCCESS | READ_DATA_DUMP_ERROR

type State = {
  dataDump: EdgeDataDump | null,
  error: Error | null,
  pending: boolean
}

const initialState: State = {
  dataDump: null,
  error: null,
  pending: false
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'READ_DATA_DUMP_START': {
      return { ...state, pending: true, error: null }
    }

    case 'READ_DATA_DUMP_SUCCESS': {
      return { ...state, pending: false, dataDump: action.dataDump }
    }

    case 'READ_DATA_DUMP_ERROR': {
      return { ...state, pending: false, error: action.error }
    }

    default:
      return state
  }
}

export const useDataDump = (wallet: EdgeCurrencyWallet | null | void) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const getDataDump = () => {
    if (!wallet) return
    dispatch({ type: 'READ_DATA_DUMP_START' })
    wallet
      .dumpData()
      .then((dataDump: EdgeDataDump) => dispatch({ type: 'READ_DATA_DUMP_SUCCESS', dataDump }))
      .catch((error: Error) => dispatch({ type: 'READ_DATA_DUMP_ERROR', error }))
  }

  return { ...state, getDataDump }
}
