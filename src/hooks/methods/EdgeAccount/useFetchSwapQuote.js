// @flow

import { type EdgeAccount, type EdgeSwapRequest } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useFetchSwapQuote = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const fetchSwapQuote = (account: EdgeAccount, request: EdgeSwapRequest) => {
    onStart()
    return account
      .fetchSwapQuote(request)
      .then(onSuccess)
      .catch(onError)
  }

  return { fetchSwapQuote, ...rest }
}
