import { EdgeAccount, EdgeSwapQuote, EdgeSwapRequest, EdgeSwapRequestOptions } from 'edge-core-js'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useSwapQuote = (
  account: EdgeAccount,
  { request, ...options }: EdgeSwapRequestOptions & { request: EdgeSwapRequest },
) => {
  const { onSuccess, onError, pending, error, data } = useAsync<EdgeSwapQuote>({ pending: true })

  React.useEffect(() => {
    account.fetchSwapQuote(request, options).then(onSuccess).catch(onError)
  }, [account, onError, onSuccess, options, request])

  return {
    error,
    swapQuote: data,
    pending,
  }
}
