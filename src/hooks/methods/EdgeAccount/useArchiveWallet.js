// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useArchiveWallet = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const archiveWallet = (account: EdgeAccount, walletId: string) => {
    onStart()
    return account
      .changeWalletStates({ [walletId]: { archived: false } })
      .then(onSuccess)
      .catch(onError)
  }

  return { archiveWallet, ...rest }
}
