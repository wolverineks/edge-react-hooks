// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useGetFirstWalletInfo = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const getFirstWalletInfo = (account: EdgeAccount, type: string) => {
    onStart()
    return Promise.resolve(account.getFirstWalletInfo(type))
      .then(onSuccess)
      .catch(onError)
  }

  return { getFirstWalletInfo, ...rest }
}
