import { Disklet } from 'disklet'
import { useMutation } from 'react-query'

export const useWrite = <T>(
  storage: Disklet,
  { path, stringify = JSON.stringify }: { path: string; stringify?: (data: T) => string },
) => {
  const [execute, rest] = useMutation(({ data }: { data: T }) => storage.setText(path, stringify(data)))

  return { execute, ...rest }
}

export const useDelete = (storage: Disklet, { path }: { path: string }) => {
  const [execute, rest] = useMutation(() => storage.delete(path))

  return { execute, ...rest }
}
