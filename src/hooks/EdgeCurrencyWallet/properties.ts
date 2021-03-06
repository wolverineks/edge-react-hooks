import { EdgeCurrencyCodeOptions, EdgeCurrencyWallet, EdgeGetTransactionsOptions, EdgeSpendInfo } from 'edge-core-js'
import * as React from 'react'
import { useMutation } from 'react-query'

import { useOnNewTransactions, useOnTransactionsChanged } from './events'

export const useEnabledTokens = (wallet: EdgeCurrencyWallet) => {
  const [execute, rest] = useMutation(() => wallet.getEnabledTokens())

  React.useEffect(() => {
    execute()
  }, [execute, wallet])

  return { execute, ...rest }
}

export const useTransactions = (wallet: EdgeCurrencyWallet, { options }: { options?: EdgeGetTransactionsOptions }) => {
  const [execute, rest] = useMutation(() => wallet.getTransactions(options))

  React.useEffect(() => {
    execute()
  }, [execute, wallet, options])

  useOnNewTransactions(wallet, () => execute())
  useOnTransactionsChanged(wallet, () => execute())

  return { execute, ...rest }
}

export const useTransactionCount = (
  wallet: EdgeCurrencyWallet,
  { options }: { options: EdgeGetTransactionsOptions },
) => {
  const [execute, rest] = useMutation(() => wallet.getNumTransactions(options))

  React.useEffect(() => {
    execute()
  }, [execute, wallet, options])

  useOnNewTransactions(wallet, () => execute())
  useOnTransactionsChanged(wallet, () => execute())

  return { execute, ...rest }
}

export const useReceiveAddressAndEncodeUri = (
  wallet: EdgeCurrencyWallet,
  { nativeAmount, options }: { nativeAmount: string; options?: EdgeCurrencyCodeOptions },
) => {
  const [execute, rest] = useMutation(() => {
    const receiveAddress = wallet.getReceiveAddress({ currencyCode: options?.currencyCode })
    const encodeUri = receiveAddress.then(({ publicAddress }) =>
      wallet.encodeUri({
        publicAddress,
        nativeAmount: nativeAmount || '0',
      }),
    )

    return Promise.all([receiveAddress, encodeUri]).then(([receiveAddress, uri]) => ({ receiveAddress, uri }))
  })

  React.useEffect(() => {
    execute()
  }, [execute, wallet, nativeAmount, options?.currencyCode])

  return { execute, ...rest }
}

export const usePaymentProtocolInfo = (wallet: EdgeCurrencyWallet, { uri }: { uri: string }) => {
  const [execute, rest] = useMutation(() => wallet.getPaymentProtocolInfo(uri))

  React.useEffect(() => {
    execute()
  }, [execute, wallet, uri])

  return { execute, ...rest }
}

export const useParsedUri = (
  wallet: EdgeCurrencyWallet,
  { uri, currencyCode }: { uri: string; currencyCode?: string },
) => {
  const [execute, rest] = useMutation(() => wallet.parseUri(uri, currencyCode))

  React.useEffect(() => {
    execute()
  }, [execute, wallet, uri, currencyCode])

  return { execute, ...rest }
}

export const useNativeToDenomination = (
  wallet: EdgeCurrencyWallet,
  { nativeAmount, currencyCode }: { nativeAmount: string; currencyCode: string },
) => {
  const [execute, rest] = useMutation(() => wallet.nativeToDenomination(nativeAmount, currencyCode))

  React.useEffect(() => {
    execute()
  }, [execute, wallet, nativeAmount, currencyCode])

  return { execute, ...rest }
}

export const useDenominationToNative = (
  wallet: EdgeCurrencyWallet,
  { denomimatedAmount, currencyCode }: { denomimatedAmount: string; currencyCode: string },
) => {
  const [execute, rest] = useMutation(() => wallet.denominationToNative(denomimatedAmount, currencyCode))

  React.useEffect(() => {
    execute()
  }, [execute, wallet, denomimatedAmount, currencyCode])

  return { execute, ...rest }
}

export const useNewTransaction = (wallet: EdgeCurrencyWallet, { spendInfo }: { spendInfo: EdgeSpendInfo }) => {
  const [execute, rest] = useMutation(() => wallet.makeSpend(spendInfo))

  React.useEffect(() => {
    execute()
  }, [execute, wallet, spendInfo])

  return { execute, ...rest }
}

export const useSweepTransaction = (wallet: EdgeCurrencyWallet, { spendInfo }: { spendInfo: EdgeSpendInfo }) => {
  const [execute, rest] = useMutation(() => wallet.sweepPrivateKeys(spendInfo))

  React.useEffect(() => {
    execute()
  }, [execute, wallet, spendInfo])

  return { execute, ...rest }
}

export const useMaxSpendable = (wallet: EdgeCurrencyWallet, { spendInfo }: { spendInfo: EdgeSpendInfo }) => {
  const [execute, rest] = useMutation(() => wallet.getMaxSpendable(spendInfo))

  React.useEffect(() => {
    execute()
  }, [execute, wallet, spendInfo])

  return { execute, ...rest }
}
