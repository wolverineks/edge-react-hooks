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
  const [execute, { data: swapQuote, ...rest }] = useMutation(() => account.fetchSwapQuote(request, options))

  React.useEffect(() => {
    execute()
  }, [execute, account, request, options])

  return { swapQuote, pending: rest.status === 'loading', ...rest }
}

export const useSplittableWalletTypes = (account: EdgeAccount, { walletId }: { walletId: string }) => {
  const [execute, { data, ...rest }] = useMutation(() => account.listSplittableWalletTypes(walletId))

  React.useEffect(() => {
    execute()
  }, [execute, account, walletId])

  return { splittalbleWalletTypes: data, pending: rest.status === 'loading', ...rest }
}

export const useWaitForCurrencyWallet = (account: EdgeAccount, { walletId }: { walletId: string }) => {
  const [execute, { data: wallet, ...rest }] = useMutation(() => account.waitForCurrencyWallet(walletId))

  React.useEffect(() => {
    execute()
  }, [execute, account, walletId])

  return { wallet, pending: rest.status === 'loading', ...rest }
}

export const useSplitWalletInfo = (
  account: EdgeAccount,
  { walletId, newWalletType }: { walletId: string; newWalletType: string },
) => {
  const [execute, { data, ...rest }] = useMutation(() => account.splitWalletInfo(walletId, newWalletType))

  React.useEffect(() => {
    execute()
  }, [execute, account, walletId, newWalletType])

  return { data, pending: rest.status === 'loading', ...rest }
}

export const useLobby = (account: EdgeAccount, { lobbyId }: { lobbyId: string }) => {
  const [execute, { data, ...rest }] = useMutation(() => account.fetchLobby(lobbyId))

  React.useEffect(() => {
    execute()
  }, [execute, account, lobbyId])

  return { lobby: data, pending: rest.status === 'loading', ...rest }
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
    amount: number
    options?: EdgeConvertCurrencyOpts
  },
) => {
  const [execute, { data, ...rest }] = useMutation<number>(() =>
    rateCache.convertCurrency(fromCurrency, toCurrency, amount, options),
  )

  React.useEffect(() => {
    execute()
  }, [execute, rateCache, fromCurrency, toCurrency, amount, options])

  return { convertCurrency: execute, amount: data, pending: rest.status === 'loading', ...rest }
}

export const useVerifyPin = (account: EdgeAccount, { pin }: { pin: string }) => {
  const [execute, { data, ...rest }] = useMutation(() => account.checkPin(pin))
  React.useEffect(() => {
    execute()
  }, [execute, account, pin])

  return { pinVerified: data, pending: rest.status === 'loading', ...rest }
}

export const useVerifyPassword = (account: EdgeAccount, { password }: { password: string }) => {
  const [execute, { data, ...rest }] = useMutation(() => account.checkPassword(password))
  React.useEffect(() => {
    execute()
  }, [execute, account, password])

  return { passwordVerified: data, pending: rest.status === 'loading', ...rest }
}
