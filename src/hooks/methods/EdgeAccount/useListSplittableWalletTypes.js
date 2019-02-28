// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useListSplittableWalletTypes = () => {
  const { onStart, onSuccess, onError, pending, error, data } = useAsync()

  const listSplittableWalletTypes = (account: EdgeAccount, id: string) => {
    onStart()
    return account
      .listSplittableWalletTypes(id)
      .then(onSuccess)
      .catch(onError)
  }

  return {
    error,
    listSplittableWalletTypes,
    pending,
    splittalbleWalletTypes: (data: ?Array<string>),
  }
}
