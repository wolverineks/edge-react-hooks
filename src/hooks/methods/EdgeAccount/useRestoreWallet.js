// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useRestoreWallet = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const restoreWallet = (account: EdgeAccount, walletId: string) => {
    onStart()
    return account
      .changeWalletStates({ [walletId]: { archived: false, deleted: false } })
      .then(onSuccess)
      .catch(onError)
  }

  return { restoreWallet, ...rest }
}
