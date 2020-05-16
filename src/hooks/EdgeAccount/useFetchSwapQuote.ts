import * as React from 'react'
import { useAsync } from 'react-use-async'

import { EdgeAccount } from '../../types'

export const useFetchSwapQuote = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const fetchSwapQuote = React.useCallback(
    (...args: Parameters<EdgeAccount['fetchSwapQuote']>) => {
      onStart()
      account
        .fetchSwapQuote(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [account, onError, onStart, onSuccess],
  )

  return {
    error,
    fetchSwapQuote,
    pending,
    reset,
    swapQuote: data,
  }
}
