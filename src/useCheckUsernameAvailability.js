// @flow

import { type EdgeContext } from 'edge-core-js'
import { useReducer } from 'react'

type CheckUsernameAvailabilityStart = {| type: 'CHECK_USERNAME_AVAILABILITY_START' |}
type CheckUsernameAvailabilitySuccess = {| type: 'CHECK_USERNAME_AVAILABILITY_SUCCESS', usernameAvailability: boolean |}
type CheckUsernameAvailabilityError = {| error: Error, type: 'CHECK_USERNAME_AVAILABILITY_ERROR' |}

type Action = CheckUsernameAvailabilityStart | CheckUsernameAvailabilitySuccess | CheckUsernameAvailabilityError

type State = {| error: Error | null, pending: boolean, usernameAvailability: boolean | null |}

const initialState: State = { pending: false, error: null, usernameAvailability: null }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CHECK_USERNAME_AVAILABILITY_START': {
      return { ...state, pending: true, error: null, usernameAvailability: null }
    }
    case 'CHECK_USERNAME_AVAILABILITY_SUCCESS': {
      return { ...state, pending: false, usernameAvailability: action.usernameAvailability }
    }
    case 'CHECK_USERNAME_AVAILABILITY_ERROR': {
      return { ...state, pending: false, error: action.error }
    }
    default:
      return state
  }
}

export const useCheckUsernameAvailability = (context: ?EdgeContext, username: ?string) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const checkUsernameAvailability = () => {
    if (!context || !username) return
    dispatch({ type: 'CHECK_USERNAME_AVAILABILITY_START' })
    context
      .usernameAvailable(username)
      .then((usernameAvailability: boolean) =>
        dispatch({ type: 'CHECK_USERNAME_AVAILABILITY_SUCCESS', usernameAvailability })
      )
      .catch((error: Error) => dispatch({ type: 'CHECK_USERNAME_AVAILABILITY_ERROR', error }))
  }

  return { ...state, checkUsernameAvailability }
}
