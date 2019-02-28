// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useDisableOtp = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const disableOtp = (account: EdgeAccount) => {
    onStart()
    return account
      .disableOtp()
      .then(onSuccess)
      .catch(onError)
  }

  return { disableOtp, ...rest }
}
