// @flow

import { type EdgeAccount, type EdgeCreateCurrencyWalletOptions } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useCreateCurrencyWallet = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const createCurrencyWallet = (account: EdgeAccount, type: string, options?: EdgeCreateCurrencyWalletOptions) => {
    onStart()
    return account
      .createCurrencyWallet(type, options || undefined)
      .then(onSuccess)
      .catch(onError)
  }

  return { createCurrencyWallet, ...rest }
}
