// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useDeleteRecovery = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const deleteRecovery = (account: EdgeAccount) => {
    onStart()
    return account
      .deleteRecovery()
      .then(onSuccess)
      .catch(onError)
  }

  return { deleteRecovery, ...rest }
}
