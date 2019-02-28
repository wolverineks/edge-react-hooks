// @flow

import { type EdgeCurrencyWallet, type EdgeGetTransactionsOptions } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useExportTransactionsToQBO = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const exportTransactionsToQBO = (wallet: EdgeCurrencyWallet, options: EdgeGetTransactionsOptions) => {
    onStart()
    return wallet
      .exportTransactionsToQBO(options)
      .then(onSuccess)
      .catch(onError)
  }

  return { exportTransactionsToQBO, ...rest }
}
