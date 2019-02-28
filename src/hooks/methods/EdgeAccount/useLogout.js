// @flow

import { type EdgeAccount } from 'edge-core-js'
import { useAsync } from 'react-use-async'

export const useLogout = () => {
  const { onStart, onSuccess, onError, ...rest } = useAsync()

  const logout = (account: EdgeAccount) => {
    onStart()
    return account
      .logout()
      .then(onSuccess)
      .catch(onError)
  }

  return { logout, ...rest }
}
