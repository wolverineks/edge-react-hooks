// @flow

import { type EdgeContext } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useListUsernames = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const listUsernames = (context: EdgeContext) => {
    onStart()
    return context
      .listUsernames()
      .then(onSuccess)
      .catch(onError)
  }

  return { listUsernames, ...rest }
}
