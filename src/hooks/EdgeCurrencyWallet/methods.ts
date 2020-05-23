import {
  EdgeCurrencyWallet,
  EdgeGetTransactionsOptions,
  EdgeMetadata,
  EdgeReceiveAddress,
  EdgeTokenInfo,
  EdgeTransaction,
} from 'edge-core-js'
import { useMutation } from 'react-query'

export const useStopEngine = (wallet: EdgeCurrencyWallet) => {
  const [execute, { ...rest }] = useMutation(() => wallet.stopEngine())

  return { stopEngine: execute, pending: rest.status === 'loading', ...rest }
}

export const useStartEngine = (wallet: EdgeCurrencyWallet) => {
  const [execute, { ...rest }] = useMutation(() => wallet.startEngine())

  return { startEngine: execute, pending: rest.status === 'loading', ...rest }
}

export const useResyncBlockchain = (wallet: EdgeCurrencyWallet) => {
  const [execute, { ...rest }] = useMutation(() => wallet.resyncBlockchain())

  return { resyncBlockchain: execute, pending: rest.status === 'loading', ...rest }
}

export const useDumpData = (wallet: EdgeCurrencyWallet) => {
  const [execute, { data, ...rest }] = useMutation(() => wallet.dumpData())

  return { dumpData: execute, data, pending: rest.status === 'loading', ...rest }
}

export const useSignTx = (wallet: EdgeCurrencyWallet) => {
  const [execute, { data, ...rest }] = useMutation(({ transaction }: { transaction: EdgeTransaction }) =>
    wallet.signTx(transaction),
  )

  return { signTx: execute, transaction: data, pending: rest.status === 'loading', ...rest }
}

export const useBroadcastTx = (wallet: EdgeCurrencyWallet) => {
  const [execute, { data, ...rest }] = useMutation(({ transaction }: { transaction: EdgeTransaction }) =>
    wallet.broadcastTx(transaction),
  )

  return { broadcastTx: execute, transaction: data, pending: rest.status === 'loading', ...rest }
}

export const useSaveTx = (wallet: EdgeCurrencyWallet) => {
  const [execute, { ...rest }] = useMutation(({ transaction }: { transaction: EdgeTransaction }) =>
    wallet.saveTx(transaction),
  )

  return { saveTx: execute, pending: rest.status === 'loading', ...rest }
}

export const useAddCustomToken = (wallet: EdgeCurrencyWallet) => {
  const [execute, { ...rest }] = useMutation(({ tokenInfo }: { tokenInfo: EdgeTokenInfo }) =>
    wallet.addCustomToken(tokenInfo),
  )

  return { addCustomToken: execute, pending: rest.status === 'loading', ...rest }
}

export const useEnableTokens = (wallet: EdgeCurrencyWallet) => {
  const [execute, { ...rest }] = useMutation(({ tokens }: { tokens: string[] }) => wallet.enableTokens(tokens))

  return { enableTokens: execute, pending: rest.status === 'loading', ...rest }
}

export const useDisableTokens = (wallet: EdgeCurrencyWallet) => {
  const [execute, { ...rest }] = useMutation(({ tokens }: { tokens: string[] }) => wallet.disableTokens(tokens))

  return { disableTokens: execute, pending: rest.status === 'loading', ...rest }
}

export const useSaveReceiveAddress = (wallet: EdgeCurrencyWallet) => {
  const [execute, { ...rest }] = useMutation(({ receiveAddress }: { receiveAddress: EdgeReceiveAddress }) =>
    wallet.saveReceiveAddress(receiveAddress),
  )

  return { saveReceiveAddress: execute, pending: rest.status === 'loading', ...rest }
}

export const useLockReceiveAddress = (wallet: EdgeCurrencyWallet) => {
  const [execute, { ...rest }] = useMutation(({ receiveAddress }: { receiveAddress: EdgeReceiveAddress }) =>
    wallet.lockReceiveAddress(receiveAddress),
  )

  return { lockReceiveAddress: execute, pending: rest.status === 'loading', ...rest }
}

export const useExportTransactionsToQBO = (wallet: EdgeCurrencyWallet) => {
  const [execute, { ...rest }] = useMutation(({ options }: { options: EdgeGetTransactionsOptions }) =>
    wallet.exportTransactionsToQBO(options),
  )

  return { exportTransactionsToQBO: execute, pending: rest.status === 'loading', ...rest }
}

export const useExportTransactionsToCSV = (wallet: EdgeCurrencyWallet) => {
  const [execute, { ...rest }] = useMutation(({ options }: { options: EdgeGetTransactionsOptions }) =>
    wallet.exportTransactionsToCSV(options),
  )

  return { exportTransactionsToCSV: execute, pending: rest.status === 'loading', ...rest }
}

export const useSaveTxMetadata = (wallet: EdgeCurrencyWallet) => {
  const [
    execute,
    { ...rest },
  ] = useMutation(({ txid, currencyCode, metadata }: { txid: string; currencyCode: string; metadata: EdgeMetadata }) =>
    wallet.saveTxMetadata(txid, currencyCode, metadata),
  )

  return { saveTxMetadata: execute, pending: rest.status === 'loading', ...rest }
}

export const useRenameWallet = (wallet: EdgeCurrencyWallet) => {
  const [execute, { ...rest }] = useMutation(({ name }: { name: string }) => wallet.renameWallet(name))

  return { renameWallet: execute, pending: rest.status === 'loading', ...rest }
}

export const useSetFiatCurrencyCode = (wallet: EdgeCurrencyWallet) => {
  const [execute, { ...rest }] = useMutation(({ fiatCurrencyCode }: { fiatCurrencyCode: string }) =>
    wallet.setFiatCurrencyCode(fiatCurrencyCode),
  )

  return { setFiatCurrencyCode: execute, pending: rest.status === 'loading', ...rest }
}
