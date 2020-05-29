import { Disklet } from 'disklet'
import { useMutation } from 'react-query'

export const useWrite = (
  storage: Disklet,
  { path, data, stringify = JSON.stringify }: { path: string; data: any; stringify?: (data: any) => string },
) => {
  const [execute, rest] = useMutation(() => storage.setText(path, stringify(data)))

  return { execute, ...rest }
}

export const useDelete = (storage: Disklet, { path }: { path: string }) => {
  const [execute, rest] = useMutation(() => storage.delete(path))

  return { execute, ...rest }
}
