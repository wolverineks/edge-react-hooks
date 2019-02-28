// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useDeletePin = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const deletePin = (account: EdgeAccount) => {
    onStart()
    return account
      .deletePin()
      .then(onSuccess)
      .catch(onError)
  }

  return { deletePin, ...rest }
}
