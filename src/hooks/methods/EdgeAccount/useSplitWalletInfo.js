// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useSplitWalletInfo = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const splitWalletInfo = (account: EdgeAccount, id: string, newWalletType: string) => {
    onStart()
    return account
      .splitWalletInfo(id, newWalletType)
      .then(onSuccess)
      .catch(onError)
  }

  return { splitWalletInfo, ...rest }
}
