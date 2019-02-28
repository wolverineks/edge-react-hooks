// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useListSplittableWalletTypes = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const listSplittableWalletTypes = (account: EdgeAccount, id: string) => {
    onStart()
    return account
      .listSplittableWalletTypes(id)
      .then(onSuccess)
      .catch(onError)
  }

  return { listSplittableWalletTypes, ...rest }
}
