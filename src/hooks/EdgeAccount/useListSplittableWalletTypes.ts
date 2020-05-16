import * as React from 'react'
import { useAsync } from 'react-use-async'
import { EdgeAccount } from '../../types'

export const useListSplittableWalletTypes = (account: EdgeAccount) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync()

  const listSplittableWalletTypes = React.useCallback(
    (...args: Parameters<EdgeAccount['listSplittableWalletTypes']>) => {
      onStart()
      account
        .listSplittableWalletTypes(...args)
        .then(onSuccess)
        .catch(onError)
    },
    [account, onError, onStart, onSuccess],
  )

  return {
    error,
    listSplittableWalletTypes,
    pending,
    reset,
    splittalbleWalletTypes: data,
  }
}
