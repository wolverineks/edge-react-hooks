import * as React from 'react'
import { Disklet } from 'disklet'
import { useAsync } from 'react-use-async'

export const useWrite = (disklet: Disklet, path: string) => {
  const { onStart, onSuccess, onError, reset, pending, error } = useAsync()

  const write = React.useCallback(
    (data: any) => {
      onStart()
      Promise.resolve(data)
        .then(JSON.stringify)
        .then((text) => disklet.setText(path, text))
        .then(onSuccess)
        .catch(onError)
    },
    [disklet, onError, onStart, onSuccess, path],
  )

  return {
    error,
    write,
    pending,
    reset,
  }
}
