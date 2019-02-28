// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useChangePin = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const changePin = (account: EdgeAccount, options: { enableLogin?: boolean, pin?: string }) => {
    onStart()
    return account
      .changePin(options)
      .then(onSuccess)
      .catch(onError)
  }

  return { changePin, ...rest }
}
