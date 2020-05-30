import {
  EdgeAccount,
  EdgeConvertCurrencyOpts,
  EdgeRateCache,
  EdgeSwapRequest,
  EdgeSwapRequestOptions,
} from 'edge-core-js'
import * as React from 'react'
import { useMutation } from 'react-query'

export const useSwapQuote = (
  account: EdgeAccount,
  { request, options }: { request: EdgeSwapRequest; options: EdgeSwapRequestOptions },
) => {
  const [execute, rest] = useMutation(() => account.fetchSwapQuote(request, options))

  React.useEffect(() => {
    execute()
  }, [execute, account, request, options])

  return { execute, ...rest }
}

export const useSplittableWalletTypes = (account: EdgeAccount, { walletId }: { walletId: string }) => {
  const [execute, rest] = useMutation(() => account.listSplittableWalletTypes(walletId))

  React.useEffect(() => {
    execute()
  }, [execute, account, walletId])

  return { execute, ...rest }
}

export const useWaitForCurrencyWallet = (account: EdgeAccount, { walletId }: { walletId: string }) => {
  const [execute, rest] = useMutation(() => account.waitForCurrencyWallet(walletId))

  React.useEffect(() => {
    execute()
  }, [execute, account, walletId])

  return { execute, ...rest }
}

export const useSplitWalletInfo = (
  account: EdgeAccount,
  { walletId, newWalletType }: { walletId: string; newWalletType: string },
) => {
  const [execute, rest] = useMutation(() => account.splitWalletInfo(walletId, newWalletType))

  React.useEffect(() => {
    execute()
  }, [execute, account, walletId, newWalletType])

  return { execute, ...rest }
}

export const useLobby = (account: EdgeAccount, { lobbyId }: { lobbyId: string }) => {
  const [execute, rest] = useMutation(() => account.fetchLobby(lobbyId))

  React.useEffect(() => {
    execute()
  }, [execute, account, lobbyId])

  return { execute, ...rest }
}

export const useConvertCurrency = (
  rateCache: EdgeRateCache,
  {
    fromCurrency,
    toCurrency,
    amount,
    options,
  }: {
    fromCurrency: string
    toCurrency: string
    amount?: number
    options?: EdgeConvertCurrencyOpts
  },
) => {
  const [execute, rest] = useMutation<number>(() =>
    rateCache.convertCurrency(fromCurrency, toCurrency, amount, options),
  )

  React.useEffect(() => {
    rateCache.on('update', () => execute())
    execute()
  }, [execute, rateCache, fromCurrency, toCurrency, amount, options])

  return { execute, ...rest }
}

export const useVerifyPin = (account: EdgeAccount, { pin }: { pin: string }) => {
  const [execute, rest] = useMutation(() => account.checkPin(pin))
  React.useEffect(() => {
    execute()
  }, [execute, account, pin])

  return { execute, ...rest }
}

export const useVerifyPassword = (account: EdgeAccount, { password }: { password: string }) => {
  const [execute, rest] = useMutation(() => account.checkPassword(password))
  React.useEffect(() => {
    execute()
  }, [execute, account, password])

  return { execute, ...rest }
}
