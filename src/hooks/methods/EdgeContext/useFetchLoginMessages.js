// @flow

import { type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useFetchLoginMessages = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const fetchLoginMessages = (context: EdgeContext) => {
    onStart()
    return context
      .fetchLoginMessages()
      .then(onSuccess)
      .catch(onError)
  }

  return { fetchLoginMessages, ...rest }
}
