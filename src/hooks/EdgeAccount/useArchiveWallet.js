// @flow

import { type EdgeAccount } from 'edge-core-js'

import { useChangeWalletStates } from './useChangeWalletStates'

export const useArchiveWallet = () => {
  const { changeWalletStates, error, pending, reset } = useChangeWalletStates()

  const archiveWallet = (account: EdgeAccount, walletId: string) => {
    return changeWalletStates(account, { [walletId]: { archived: true, deleted: false } })
  }

  return {
    archiveWallet,
    error,
    pending,
    reset,
  }
}
