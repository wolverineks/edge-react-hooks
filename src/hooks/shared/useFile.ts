import { Disklet } from 'disklet'
import * as React from 'react'
import { useAsync } from 'react-use-async'

export const useFile = (disklet: Disklet, path: string) => {
  const { onSuccess, onError, pending, error, data } = useAsync<string>({ pending: true })

  const getFile = React.useCallback(() => {
    disklet.getText(path).then(JSON.parse).then(onSuccess).catch(onError)
  }, [disklet, onError, onSuccess, path])

  React.useEffect(getFile, [disklet, getFile, path])

  return {
    error,
    file: data,
    pending,
    refresh: getFile,
  }
}
