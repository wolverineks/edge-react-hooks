import { Disklet } from 'disklet'
import * as React from 'react'
import { useMutation } from 'react-query'

export const useFile = <FileType>(
  storage: Disklet,
  { path, parse = (text) => JSON.parse(text) as FileType }: { path: string; parse?: (string: string) => FileType },
) => {
  const [execute, rest] = useMutation(() => Promise.resolve(path).then(storage.getText).then(parse))
  React.useEffect(() => {
    execute()
  }, [storage, path, execute])

  return { execute, ...rest }
}

export const useFolder = (storage: Disklet, { path }: { path: string }) => {
  const [execute, rest] = useMutation(() => storage.list(path))

  React.useEffect(() => {
    execute()
  }, [storage, path, execute])

  return { execute, ...rest }
}
