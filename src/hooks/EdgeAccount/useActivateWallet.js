// @flow

import { type EdgeAccount } from 'edge-core-js'

import { useChangeWalletStates } from './useChangeWalletStates'

export const useActivateWallet = () => {
  const { changeWalletStates, error, pending, reset } = useChangeWalletStates()

  const activateWallet = (account: EdgeAccount, walletId: string) => {
    return changeWalletStates(account, { [walletId]: { archived: false, deleted: false } })
  }

  return {
    activateWallet,
    error,
    pending,
    reset,
  }
}
