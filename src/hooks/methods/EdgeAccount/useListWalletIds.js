// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useListWalletIds = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const listWalletIds = (account: EdgeAccount) => {
    onStart()
    return Promise.resolve(account.listWalletIds())
      .then(onSuccess)
      .catch(onError)
  }

  return { listWalletIds, ...rest }
}
