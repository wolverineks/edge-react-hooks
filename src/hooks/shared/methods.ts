import { EdgeAccount, EdgeCurrencyWallet } from 'edge-core-js'
import { useMutation } from 'react-query'

type Syncable = EdgeAccount | EdgeCurrencyWallet

export const useSync = (syncable: Syncable) => {
  const [execute, rest] = useMutation(() => syncable.sync())

  return { execute, ...rest }
}
