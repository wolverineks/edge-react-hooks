// @flow

import { type EdgeContext, type EdgeEdgeLoginOptions } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useRequestEdgeLogin = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const requestEdgeLogin = (context: EdgeContext, options: EdgeEdgeLoginOptions) => {
    onStart()
    return context
      .requestEdgeLogin(options)
      .then(onSuccess)
      .catch(onError)
  }

  return { requestEdgeLogin, ...rest }
}
