// @flow

import { type EdgeAccount, type EthereumTransaction } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useSignEthereumTransaction = () => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const signEthereumTransaction = (account: EdgeAccount, walletId: string, transaction: EthereumTransaction) => {
    onStart()
    return account
      .signEthereumTransaction(walletId, transaction)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    data,
    error,
    pending,
    reset,
    signEthereumTransaction,
  }
}
