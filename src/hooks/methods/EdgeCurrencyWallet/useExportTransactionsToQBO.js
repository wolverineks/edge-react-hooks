// @flow

import { type EdgeCurrencyWallet, type EdgeGetTransactionsOptions } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useExportTransactionsToQBO = () => {
  const { onStart, onSuccess, onError, error, pending, data } = useAsync()

  const exportTransactionsToQBO = (wallet: EdgeCurrencyWallet, options: EdgeGetTransactionsOptions) => {
    onStart()
    return wallet
      .exportTransactionsToQBO(options)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    exportTransactionsToQBO,
    pending,
    qbo: (data: ?string),
  }
}
