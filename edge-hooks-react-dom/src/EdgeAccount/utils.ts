import { EdgeAccount, EdgeCurrencyConfig, EdgeWalletInfoFull } from 'edge-core-js'

export const getCurrencyConfig = (account: EdgeAccount, { walletType }: { walletType: string }) =>
  Object.values(account.currencyConfig).find(
    (currencyConfig) => currencyConfig.currencyInfo.walletType === walletType,
  ) as EdgeCurrencyConfig

export const getSortedCurrencyWallets = (account: EdgeAccount) => {
  const { activeWalletIds, currencyWallets } = account

  return activeWalletIds.map((id) => currencyWallets[id])
}

export const getActiveWalletInfos = (account: EdgeAccount) =>
  account.allKeys.filter(({ archived, deleted }) => !archived && !deleted)

export const getArchivedWalletInfos = (account: EdgeAccount) =>
  account.allKeys.filter(({ archived, deleted }) => archived && !deleted) as EdgeWalletInfoFull[]

export const getDeletedWalletInfos = (account: EdgeAccount) => account.allKeys.filter(({ deleted }) => deleted)

export const getLogo = (account: EdgeAccount, { walletType }: { walletType: string }) =>
  getCurrencyConfig(account, { walletType }).currencyInfo.symbolImage

export const getWalletTypes = (account: EdgeAccount) =>
  Object.values(account.currencyConfig).map((currencyConfig: EdgeCurrencyConfig) => ({
    display: currencyConfig.currencyInfo.displayName,
    type: currencyConfig.currencyInfo.walletType,
    currencyCode: currencyConfig.currencyInfo.currencyCode,
    logo: currencyConfig.currencyInfo.symbolImage,
    logoDark: currencyConfig.currencyInfo.symbolImageDarkMono,
  }))
