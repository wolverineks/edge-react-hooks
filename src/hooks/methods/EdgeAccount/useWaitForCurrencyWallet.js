// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useWaitForCurrencyWallet = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const waitForCurrencyWallet = (account: EdgeAccount, id: string) => {
    onStart()
    return account
      .waitForCurrencyWallet(id)
      .then(onSuccess)
      .catch(onError)
  }

  return { waitForCurrencyWallet, ...rest }
}
