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
  const [execute, rest] = useMutation(() => wallet.stopEngine())

  return { execute, ...rest }
}

export const useStartEngine = (wallet: EdgeCurrencyWallet) => {
  const [execute, rest] = useMutation(() => wallet.startEngine())

  return { execute, ...rest }
}

export const useResyncBlockchain = (wallet: EdgeCurrencyWallet) => {
  const [execute, rest] = useMutation(() => wallet.resyncBlockchain())

  return { execute, ...rest }
}

export const useDumpData = (wallet: EdgeCurrencyWallet) => {
  const [execute, rest] = useMutation(() => wallet.dumpData())

  return { execute, ...rest }
}

export const useSignTransaction = (wallet: EdgeCurrencyWallet) => {
  const [execute, rest] = useMutation(({ transaction }: { transaction: EdgeTransaction }) => wallet.signTx(transaction))

  return { execute, ...rest }
}

export const useBroadcastTransaction = (wallet: EdgeCurrencyWallet) => {
  const [execute, rest] = useMutation(({ transaction }: { transaction: EdgeTransaction }) =>
    wallet.broadcastTx(transaction),
  )

  return { execute, ...rest }
}

export const useSaveTransaction = (wallet: EdgeCurrencyWallet) => {
  const [execute, rest] = useMutation(({ transaction }: { transaction: EdgeTransaction }) => wallet.saveTx(transaction))

  return { execute, ...rest }
}

export const useSignBroadcastAndSaveTransaction = (wallet: EdgeCurrencyWallet) => {
  const [execute, rest] = useMutation(({ transaction }: { transaction: EdgeTransaction }) => wallet.saveTx(transaction))

  return { execute, ...rest }
}

export const useAddCustomToken = (wallet: EdgeCurrencyWallet) => {
  const [execute, rest] = useMutation(({ tokenInfo }: { tokenInfo: EdgeTokenInfo }) => wallet.addCustomToken(tokenInfo))

  return { execute, ...rest }
}

export const useEnableTokens = (wallet: EdgeCurrencyWallet) => {
  const [execute, rest] = useMutation(({ tokens }: { tokens: string[] }) => wallet.enableTokens(tokens))

  return { execute, ...rest }
}

export const useDisableTokens = (wallet: EdgeCurrencyWallet) => {
  const [execute, rest] = useMutation(({ tokens }: { tokens: string[] }) => wallet.disableTokens(tokens))

  return { execute, ...rest }
}

export const useSaveReceiveAddress = (wallet: EdgeCurrencyWallet) => {
  const [execute, rest] = useMutation(({ receiveAddress }: { receiveAddress: EdgeReceiveAddress }) =>
    wallet.saveReceiveAddress(receiveAddress),
  )

  return { execute, ...rest }
}

export const useLockReceiveAddress = (wallet: EdgeCurrencyWallet) => {
  const [execute, rest] = useMutation(({ receiveAddress }: { receiveAddress: EdgeReceiveAddress }) =>
    wallet.lockReceiveAddress(receiveAddress),
  )

  return { execute, ...rest }
}

export const useExportTransactionsToQBO = (wallet: EdgeCurrencyWallet) => {
  const [execute, rest] = useMutation(({ options }: { options: EdgeGetTransactionsOptions }) =>
    wallet.exportTransactionsToQBO(options),
  )

  return { execute, ...rest }
}

export const useExportTransactionsToCSV = (wallet: EdgeCurrencyWallet) => {
  const [execute, rest] = useMutation(({ options }: { options: EdgeGetTransactionsOptions }) =>
    wallet.exportTransactionsToCSV(options),
  )

  return { execute, ...rest }
}

export const useSaveTransactionMetadata = (wallet: EdgeCurrencyWallet) => {
  const [
    execute,
    rest,
  ] = useMutation(({ txid, currencyCode, metadata }: { txid: string; currencyCode: string; metadata: EdgeMetadata }) =>
    wallet.saveTxMetadata(txid, currencyCode, metadata),
  )

  return { execute, ...rest }
}

export const useRenameWallet = (wallet: EdgeCurrencyWallet) => {
  const [execute, rest] = useMutation(({ name }: { name: string }) => wallet.renameWallet(name))

  return { execute, ...rest }
}

export const useSetFiatCurrencyCode = (wallet: EdgeCurrencyWallet) => {
  const [execute, rest] = useMutation(({ fiatCurrencyCode }: { fiatCurrencyCode: string }) =>
    wallet.setFiatCurrencyCode(fiatCurrencyCode),
  )

  return { execute, ...rest }
}
