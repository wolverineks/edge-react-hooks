// @flow

import { type EdgeAccount, type EdgeSwapRequest } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useFetchSwapQuote = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const fetchSwapQuote = (account: EdgeAccount, request: EdgeSwapRequest) => {
    onStart()
    account
      .fetchSwapQuote(request)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    fetchSwapQuote,
    pending,
    reset,
    swapQuote: data,
  }
}
