import * as React from 'react'
import { useAsync } from 'react-use-async'
import { Disklet } from 'disklet'

export const useFile = (disklet: Disklet, path: string) => {
  const { onStart, onSuccess, onError, reset, pending, error, data } = useAsync<string>({ pending: true })

  const getFile = React.useCallback(() => {
    disklet.getText(path).then(JSON.parse).then(onSuccess).catch(onError)
  }, [disklet, onError, onSuccess, path])

  React.useEffect(getFile, [disklet, getFile, onStart, path])

  return {
    error,
    file: data,
    pending,
    refresh: getFile,
    reset,
  }
}
