import {
  EdgeAccount,
  EdgeCurrencyWallet,
  EdgeDenomination,
  EdgeMetaToken,
  EdgeWalletInfo,
  EdgeWalletInfoFull,
} from 'edge-core-js'
import { useConvertCurrency } from 'edge-react-hooks'
import * as React from 'react'

import { fiatCurrencyInfos } from './fiatInfos'

export const getSortedCurrencyWallets = (account: EdgeAccount) => {
  const { activeWalletIds, currencyWallets } = account

  return activeWalletIds.map((id) => currencyWallets[id])
}

export const getActiveWalletInfos = (account: EdgeAccount) =>
  account.allKeys.filter(({ archived, deleted }) => !archived && !deleted)

export const getArchivedWalletInfos = (account: EdgeAccount) =>
  account.allKeys.filter(({ archived, deleted }) => archived && !deleted) as EdgeWalletInfoFull[]

export const getDeletedWalletInfos = (account: EdgeAccount) => account.allKeys.filter(({ deleted }) => deleted)

export const nativeToDenomination = ({
  denomination,
  nativeAmount,
}: {
  denomination: EdgeDenomination
  nativeAmount: string
}) => (Number(nativeAmount) / Number(denomination.multiplier)).toFixed(4)

export const getTokenSymbol = (tokenInfo: EdgeMetaToken) => tokenInfo.denominations[0].symbol

export const getCurrencyInfoFromCurrencyCode = (
  wallet: EdgeCurrencyWallet,
  { currencyCode }: { currencyCode: string },
) =>
  (wallet.currencyInfo.currencyCode === currencyCode
    ? wallet.currencyInfo
    : wallet.currencyInfo.metaTokens.find((tokenInfo) => tokenInfo.currencyCode === currencyCode)) as {
    currencyCode: string
    denominations: EdgeDenomination[]
    symbolImage: string
  }

export const getCurrencyInfos = (account: EdgeAccount) =>
  Object.values(account.currencyConfig).map(({ currencyInfo }) => currencyInfo)

export const getWalletTypes = (account: EdgeAccount) =>
  getCurrencyInfos(account).map(
    ({ walletType: type, displayName: display, currencyCode, symbolImage: logo, symbolImageDarkMono: logoDark }) => ({
      display,
      type,
      currencyCode,
      logo,
      logoDark,
    }),
  )

export const getCurrencyConfig = (account: EdgeAccount, { walletType }: { walletType: string }) =>
  Object.values(account.currencyConfig).find((currencyConfig) => currencyConfig.currencyInfo.walletType === walletType)

export const getCurrencyInfoFromWalletType = (account: EdgeAccount, { walletType }: { walletType: string }) =>
  (getCurrencyConfig(account, { walletType })?.currencyInfo as unknown) as {
    currencyCode: string
    denominations: EdgeDenomination[]
    symbolImage: string
  }

export const getCurrencySymbol = (account: EdgeAccount, { walletType }: { walletType: string }) =>
  getCurrencyInfoFromWalletType(account, { walletType })?.denominations[0]?.symbol

export const getLogo = (account: EdgeAccount, { walletType }: { walletType: string }) =>
  getCurrencyInfoFromWalletType(account, { walletType })?.symbolImage

export const getCurrencyCode = (account: EdgeAccount, { walletType }: { walletType: string }) =>
  getCurrencyInfoFromWalletType(account, { walletType })?.currencyCode

export const getShortId = ({ walletInfo }: { walletInfo: EdgeWalletInfo }) =>
  `${walletInfo.id.slice(0, 4)}...${walletInfo.id.slice(-4)}`

export const getFiatInfo = ({ currencyCode }: { currencyCode: string }) =>
  fiatCurrencyInfos.find((fiatInfo) => fiatInfo.isoCurrencyCode.includes(currencyCode))

export const getCurrencyCodes = (wallet: EdgeCurrencyWallet) => {
  const {
    currencyInfo: { currencyCode, metaTokens },
  } = wallet

  return [currencyCode, ...metaTokens.map(({ currencyCode }) => currencyCode)]
}

export const getAccountBalance = async (account: EdgeAccount, { toCurrencyCode }: { toCurrencyCode: string }) => {
  const accountBalances: Record<string, number> = {}
  const exchangeDenominations: Record<string, EdgeDenomination> = {}

  const wallets = Object.values(account.currencyWallets)
  wallets.forEach(({ currencyInfo, balances: walletBalances }) =>
    [currencyInfo, ...currencyInfo.metaTokens].forEach(({ currencyCode, denominations }) => {
      exchangeDenominations[currencyCode] = denominations[0]
      accountBalances[currencyCode] = (accountBalances[currencyCode] || 0) + Number(walletBalances[currencyCode] || 0)
    }),
  )

  const accountBalance = 0

  Object.entries(accountBalances).forEach(async ([currencyCode, nativeAmount]) => {
    const exchangeAmount = nativeToDenomination({
      nativeAmount: String(nativeAmount),
      denomination: exchangeDenominations[currencyCode],
    })
    account.rateCache.convertCurrency(currencyCode, toCurrencyCode, Number(exchangeAmount))
  })

  return accountBalance
}

export const useFiatAmount = ({
  account,
  currencyInfo,
  toCurrencyCode,
  nativeAmount,
}: {
  account: EdgeAccount
  currencyInfo: { currencyCode: string; denominations: EdgeDenomination[] }
  toCurrencyCode: string
  nativeAmount: string
}) => {
  const exchangeDenomination = currencyInfo.denominations[0]
  const exchangeAmount = nativeToDenomination({ denomination: exchangeDenomination, nativeAmount })
  const { data: fiatAmount } = useConvertCurrency(account.rateCache, {
    fromCurrency: currencyInfo.currencyCode,
    toCurrency: toCurrencyCode,
    amount: Number(exchangeAmount),
  })

  return fiatAmount
}

export const useTimeout = () => {
  const [{ callback, delay }, set] = React.useState({ callback: () => null, delay: 0 })

  React.useEffect(() => {
    const id = setTimeout(callback, delay)

    return () => clearTimeout(id)
  }, [callback, delay])

  const timeout = React.useCallback((callback: () => any, delay: number) => {
    set({ callback, delay })
  }, [])

  return timeout
}
