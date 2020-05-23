import { EdgeAccount, EdgeCurrencyWallet } from 'edge-core-js'
import { useMutation } from 'react-query'

type Syncable = EdgeAccount | EdgeCurrencyWallet

export const useSync = (syncable: Syncable) => {
  const [sync, { ...rest }] = useMutation(() => syncable.sync())

  return { sync, pending: rest.status === 'loading', ...rest }
}
