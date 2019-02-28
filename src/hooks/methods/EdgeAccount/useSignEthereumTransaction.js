// @flow

import { type EdgeAccount, type EthereumTransaction } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useSignEthereumTransaction = () => {
  const { onStart, onSuccess, onError, pending, error, data } = useAsync()

  const signEthereumTransaction = (account: EdgeAccount, walletId: string, transaction: EthereumTransaction) => {
    onStart()
    return account
      .signEthereumTransaction(walletId, transaction)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    data: (data: ?string),
    error,
    pending,
    signEthereumTransaction,
  }
}
