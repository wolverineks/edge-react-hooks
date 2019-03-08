// @flow

import { type EdgeAccount } from 'edge-core-js'

import { useChangeWalletStates } from './useChangeWalletStates'

export const useDeleteWallet = () => {
  const { changeWalletStates, error, pending, reset } = useChangeWalletStates()

  const deleteWallet = (account: EdgeAccount, walletId: string) => {
    return changeWalletStates(account, { [walletId]: { deleted: true } })
  }

  return {
    deleteWallet,
    error,
    pending,
    reset,
  }
}
