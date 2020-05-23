import { Disklet } from 'disklet'
import * as React from 'react'
import { useMutation } from 'react-query'

export const useFile = <FileType>(
  storage: Disklet,
  { path, parse = (text) => (text as unknown) as FileType }: { path: string; parse?: (string: string) => FileType },
) => {
  const [getFile, { data, ...rest }] = useMutation(() => Promise.resolve(path).then(storage.getText).then(parse))
  React.useEffect(() => {
    getFile()
  }, [storage, path, getFile])

  return { file: data as FileType, pending: rest.status === 'loading', ...rest }
}

export const useWrite = (
  storage: Disklet,
  { path, data, stringify = JSON.stringify }: { path: string; data: any; stringify?: (data: any) => string },
) => {
  const [write, { ...rest }] = useMutation(() =>
    Promise.resolve(data)
      .then(stringify)
      .then((text) => storage.setText(path, text)),
  )

  return { write, pending: rest.status === 'loading', ...rest }
}

export const useDelete = (storage: Disklet, { path }: { path: string }) => {
  const [execute, { ...rest }] = useMutation(() => storage.delete(path))

  return { delete: execute, pending: rest.status === 'loading', ...rest }
}

export const useFolder = (storage: Disklet, { path }: { path: string }) => {
  const [getFolder, { data: folder, ...rest }] = useMutation(() => storage.list(path))

  React.useEffect(() => {
    getFolder()
  }, [storage, path, getFolder])

  return { folder, pending: rest.status === 'loading', ...rest }
}
