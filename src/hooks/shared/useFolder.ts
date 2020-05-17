import { Disklet } from 'disklet'
import { useAsync } from 'react-use-async'
import * as React from 'react'

export const useFolder = (disklet: Disklet, path: string) => {
  const { onSuccess, onError, data, error, pending } = useAsync<Record<string, any>>({ pending: true })

  const effect = React.useCallback(() => {
    disklet.list(path).then(onSuccess, onError)
  }, [disklet, onError, onSuccess, path])

  React.useEffect(effect, [effect])

  return { error, pending, folder: data, refresh: effect }
}
