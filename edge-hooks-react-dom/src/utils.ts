import { EdgeAccount, EdgeCurrencyWallet, EdgeWalletInfo, EdgeWalletInfoFull } from 'edge-core-js'
import * as React from 'react'

export const getSortedCurrencyWallets = (account: EdgeAccount) => {
  const { activeWalletIds, currencyWallets } = account

  return activeWalletIds.map((id) => currencyWallets[id])
}

export const getActiveWalletInfos = (account: EdgeAccount) =>
  account.allKeys.filter(({ archived, deleted }) => !archived && !deleted)

export const getArchivedWalletInfos = (account: EdgeAccount) =>
  account.allKeys.filter(({ archived, deleted }) => archived && !deleted) as EdgeWalletInfoFull[]

export const getDeletedWalletInfos = (account: EdgeAccount) => account.allKeys.filter(({ deleted }) => deleted)

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

export const getCurrencySymbol = (account: EdgeAccount, { walletType }: { walletType: string }) =>
  getCurrencyInfo(account, { walletType })?.denominations[0]?.symbol

export const getCurrencyInfos = (account: EdgeAccount) =>
  Object.values(account.currencyConfig).map(({ currencyInfo }) => currencyInfo)

export const getCurrencyConfig = (account: EdgeAccount, { walletType }: { walletType: string }) =>
  Object.values(account.currencyConfig).find((currencyConfig) => currencyConfig.currencyInfo.walletType === walletType)

export const getCurrencyInfo = (account: EdgeAccount, { walletType }: { walletType: string }) =>
  getCurrencyConfig(account, { walletType })?.currencyInfo

export const getLogo = (account: EdgeAccount, { walletType }: { walletType: string }) =>
  getCurrencyInfo(account, { walletType })?.symbolImage

export const getLogoDark = (account: EdgeAccount, { walletType }: { walletType: string }) =>
  getCurrencyInfo(account, { walletType })?.symbolImageDarkMono

export const getCurrencyCode = (account: EdgeAccount, { walletType }: { walletType: string }) =>
  getCurrencyInfo(account, { walletType })?.currencyCode

export const getShortId = ({ walletInfo }: { walletInfo: EdgeWalletInfo }) =>
  `${walletInfo.id.slice(0, 4)}...${walletInfo.id.slice(-4)}`

const fiatCurrencyInfos = [
  { currencyCode: 'AED', isoCurrencyCode: 'iso:AED', symbol: 'د.إ' },
  { currencyCode: 'AFN', isoCurrencyCode: 'iso:AFN', symbol: '؋' },
  { currencyCode: 'ALL', isoCurrencyCode: 'iso:ALL', symbol: 'L' },
  { currencyCode: 'AMD', isoCurrencyCode: 'iso:AMD', symbol: '֏' },
  { currencyCode: 'ANG', isoCurrencyCode: 'iso:ANG', symbol: 'ƒ' },
  { currencyCode: 'AOA', isoCurrencyCode: 'iso:AOA', symbol: 'Kz' },
  { currencyCode: 'ARS', isoCurrencyCode: 'iso:ARS', symbol: '$' },
  { currencyCode: 'AUD', isoCurrencyCode: 'iso:AUD', symbol: '$' },
  { currencyCode: 'AWG', isoCurrencyCode: 'iso:AWG', symbol: 'ƒ' },
  { currencyCode: 'AZN', isoCurrencyCode: 'iso:AZN', symbol: '₼' },
  { currencyCode: 'BAM', isoCurrencyCode: 'iso:BAM', symbol: 'KM' },
  { currencyCode: 'BBD', isoCurrencyCode: 'iso:BBD', symbol: '$' },
  { currencyCode: 'BDT', isoCurrencyCode: 'iso:BDT', symbol: '৳' },
  { currencyCode: 'BGN', isoCurrencyCode: 'iso:BGN', symbol: 'лв' },
  { currencyCode: 'BIF', isoCurrencyCode: 'iso:BIF', symbol: 'Fr' },
  { currencyCode: 'BMD', isoCurrencyCode: 'iso:BMD', symbol: '$' },
  { currencyCode: 'BND', isoCurrencyCode: 'iso:BND', symbol: '$' },
  { currencyCode: 'BOB', isoCurrencyCode: 'iso:BOB', symbol: 'Bs.' },
  { currencyCode: 'BRL', isoCurrencyCode: 'iso:BRL', symbol: 'R$' },
  { currencyCode: 'BSD', isoCurrencyCode: 'iso:BSD', symbol: '$' },
  { currencyCode: 'BTN', isoCurrencyCode: 'iso:BTN', symbol: 'Nu.' },
  { currencyCode: 'BWP', isoCurrencyCode: 'iso:BWP', symbol: 'P' },
  { currencyCode: 'BYN', isoCurrencyCode: 'iso:BYN', symbol: 'Br' },
  { currencyCode: 'BZD', isoCurrencyCode: 'iso:BZD', symbol: '$' },
  { currencyCode: 'CAD', isoCurrencyCode: 'iso:CAD', symbol: '$' },
  { currencyCode: 'CDF', isoCurrencyCode: 'iso:CDF', symbol: 'Fr' },
  { currencyCode: 'CHF', isoCurrencyCode: 'iso:CHF', symbol: 'Fr' },
  { currencyCode: 'CLP', isoCurrencyCode: 'iso:CLP', symbol: '$' },
  { currencyCode: 'CNY', isoCurrencyCode: 'iso:CNY', symbol: '¥' },
  { currencyCode: 'COP', isoCurrencyCode: 'iso:COP', symbol: '$' },
  { currencyCode: 'CRC', isoCurrencyCode: 'iso:CRC', symbol: '₡' },
  { currencyCode: 'CUC', isoCurrencyCode: 'iso:CUC', symbol: '$' },
  { currencyCode: 'CUP', isoCurrencyCode: 'iso:CUP', symbol: '$' },
  { currencyCode: 'CVE', isoCurrencyCode: 'iso:CVE', symbol: '$' },
  { currencyCode: 'CZK', isoCurrencyCode: 'iso:CZK', symbol: 'Kč' },
  { currencyCode: 'DJF', isoCurrencyCode: 'iso:DJF', symbol: 'Fr' },
  { currencyCode: 'DKK', isoCurrencyCode: 'iso:DKK', symbol: 'kr' },
  { currencyCode: 'DOP', isoCurrencyCode: 'iso:DOP', symbol: '$' },
  { currencyCode: 'DZD', isoCurrencyCode: 'iso:DZD', symbol: 'د.ج' },
  { currencyCode: 'EGP', isoCurrencyCode: 'iso:EGP', symbol: 'ج.م' },
  { currencyCode: 'ERN', isoCurrencyCode: 'iso:ERN', symbol: 'Nfk' },
  { currencyCode: 'ETB', isoCurrencyCode: 'iso:ETB', symbol: 'Br' },
  { currencyCode: 'EUR', isoCurrencyCode: 'iso:EUR', symbol: '€' },
  { currencyCode: 'FJD', isoCurrencyCode: 'iso:FJD', symbol: '$' },
  { currencyCode: 'FKP', isoCurrencyCode: 'iso:FKP', symbol: '£' },
  { currencyCode: 'GBP', isoCurrencyCode: 'iso:GBP', symbol: '£' },
  { currencyCode: 'GEL', isoCurrencyCode: 'iso:GEL', symbol: '₾' },
  { currencyCode: 'GGP', isoCurrencyCode: 'iso:GGP', symbol: '£' },
  { currencyCode: 'GHS', isoCurrencyCode: 'iso:GHS', symbol: '₵' },
  { currencyCode: 'GIP', isoCurrencyCode: 'iso:GIP', symbol: '£' },
  { currencyCode: 'GMD', isoCurrencyCode: 'iso:GMD', symbol: 'D' },
  { currencyCode: 'GNF', isoCurrencyCode: 'iso:GNF', symbol: 'Fr' },
  { currencyCode: 'GTQ', isoCurrencyCode: 'iso:GTQ', symbol: 'Q' },
  { currencyCode: 'GYD', isoCurrencyCode: 'iso:GYD', symbol: '$' },
  { currencyCode: 'HKD', isoCurrencyCode: 'iso:HKD', symbol: '$' },
  { currencyCode: 'HNL', isoCurrencyCode: 'iso:HNL', symbol: 'L' },
  { currencyCode: 'HRK', isoCurrencyCode: 'iso:HRK', symbol: 'kn' },
  { currencyCode: 'HTG', isoCurrencyCode: 'iso:HTG', symbol: 'G' },
  { currencyCode: 'HUF', isoCurrencyCode: 'iso:HUF', symbol: 'Ft' },
  { currencyCode: 'IDR', isoCurrencyCode: 'iso:IDR', symbol: 'Rp' },
  { currencyCode: 'ILS', isoCurrencyCode: 'iso:ILS', symbol: '₪' },
  { currencyCode: 'IMP', isoCurrencyCode: 'iso:IMP', symbol: '£' },
  { currencyCode: 'INR', isoCurrencyCode: 'iso:INR', symbol: '₹' },
  { currencyCode: 'IQD', isoCurrencyCode: 'iso:IQD', symbol: 'ع.د' },
  { currencyCode: 'IRR', isoCurrencyCode: 'iso:IRR', symbol: '﷼' },
  { currencyCode: 'ISK', isoCurrencyCode: 'iso:ISK', symbol: 'kr' },
  { currencyCode: 'JEP', isoCurrencyCode: 'iso:JEP', symbol: '£' },
  { currencyCode: 'JMD', isoCurrencyCode: 'iso:JMD', symbol: '$' },
  { currencyCode: 'JOD', isoCurrencyCode: 'iso:JOD', symbol: 'د.ا' },
  { currencyCode: 'JPY', isoCurrencyCode: 'iso:JPY', symbol: '¥' },
  { currencyCode: 'KES', isoCurrencyCode: 'iso:KES', symbol: 'Sh' },
  { currencyCode: 'KGS', isoCurrencyCode: 'iso:KGS', symbol: 'с' },
  { currencyCode: 'KHR', isoCurrencyCode: 'iso:KHR', symbol: '៛' },
  { currencyCode: 'KMF', isoCurrencyCode: 'iso:KMF', symbol: 'Fr' },
  { currencyCode: 'KPW', isoCurrencyCode: 'iso:KPW', symbol: '₩' },
  { currencyCode: 'KRW', isoCurrencyCode: 'iso:KRW', symbol: '₩' },
  { currencyCode: 'KWD', isoCurrencyCode: 'iso:KWD', symbol: 'د.ك' },
  { currencyCode: 'KYD', isoCurrencyCode: 'iso:KYD', symbol: '$' },
  { currencyCode: 'KZT', isoCurrencyCode: 'iso:KZT', symbol: '₸' },
  { currencyCode: 'LAK', isoCurrencyCode: 'iso:LAK', symbol: '₭' },
  { currencyCode: 'LBP', isoCurrencyCode: 'iso:LBP', symbol: 'ل.ل' },
  { currencyCode: 'LKR', isoCurrencyCode: 'iso:LKR', symbol: 'Rs' },
  { currencyCode: 'LRD', isoCurrencyCode: 'iso:LRD', symbol: '$' },
  { currencyCode: 'LSL', isoCurrencyCode: 'iso:LSL', symbol: 'L' },
  { currencyCode: 'LYD', isoCurrencyCode: 'iso:LYD', symbol: 'ل.د' },
  { currencyCode: 'MAD', isoCurrencyCode: 'iso:MAD', symbol: 'د. م.' },
  { currencyCode: 'MDL', isoCurrencyCode: 'iso:MDL', symbol: 'L' },
  { currencyCode: 'MGA', isoCurrencyCode: 'iso:MGA', symbol: 'Ar' },
  { currencyCode: 'MKD', isoCurrencyCode: 'iso:MKD', symbol: 'ден' },
  { currencyCode: 'MMK', isoCurrencyCode: 'iso:MMK', symbol: 'Ks' },
  { currencyCode: 'MNT', isoCurrencyCode: 'iso:MNT', symbol: '₮' },
  { currencyCode: 'MOP', isoCurrencyCode: 'iso:MOP', symbol: 'P' },
  { currencyCode: 'MRO', isoCurrencyCode: 'iso:MRO', symbol: 'UM' },
  { currencyCode: 'MRU', isoCurrencyCode: 'iso:MRU', symbol: 'UM' },
  { currencyCode: 'MUR', isoCurrencyCode: 'iso:MUR', symbol: '₨' },
  { currencyCode: 'MWK', isoCurrencyCode: 'iso:MWK', symbol: 'MK' },
  { currencyCode: 'MXN', isoCurrencyCode: 'iso:MXN', symbol: '$' },
  { currencyCode: 'MYR', isoCurrencyCode: 'iso:MYR', symbol: 'RM' },
  { currencyCode: 'MZN', isoCurrencyCode: 'iso:MZN', symbol: 'MT' },
  { currencyCode: 'NAD', isoCurrencyCode: 'iso:NAD', symbol: '$' },
  { currencyCode: 'NGN', isoCurrencyCode: 'iso:NGN', symbol: '₦' },
  { currencyCode: 'NIO', isoCurrencyCode: 'iso:NIO', symbol: 'C$' },
  { currencyCode: 'NOK', isoCurrencyCode: 'iso:NOK', symbol: 'kr' },
  { currencyCode: 'NPR', isoCurrencyCode: 'iso:NPR', symbol: '₨' },
  { currencyCode: 'NZD', isoCurrencyCode: 'iso:NZD', symbol: '$' },
  { currencyCode: 'OMR', isoCurrencyCode: 'iso:OMR', symbol: 'ر.ع.' },
  { currencyCode: 'PAB', isoCurrencyCode: 'iso:PAB', symbol: 'B/.' },
  { currencyCode: 'PEN', isoCurrencyCode: 'iso:PEN', symbol: 'S/.' },
  { currencyCode: 'PGK', isoCurrencyCode: 'iso:PGK', symbol: 'K' },
  { currencyCode: 'PHP', isoCurrencyCode: 'iso:PHP', symbol: '₱' },
  { currencyCode: 'PKR', isoCurrencyCode: 'iso:PKR', symbol: '₨' },
  { currencyCode: 'PLN', isoCurrencyCode: 'iso:PLN', symbol: 'zł' },
  { currencyCode: 'PRB', isoCurrencyCode: 'iso:PRB', symbol: 'р.' },
  { currencyCode: 'PYG', isoCurrencyCode: 'iso:PYG', symbol: '₲' },
  { currencyCode: 'QAR', isoCurrencyCode: 'iso:QAR', symbol: 'ر.ق' },
  { currencyCode: 'RON', isoCurrencyCode: 'iso:RON', symbol: 'lei' },
  { currencyCode: 'RSD', isoCurrencyCode: 'iso:RSD', symbol: 'дин' },
  { currencyCode: 'RUB', isoCurrencyCode: 'iso:RUB', symbol: '₽' },
  { currencyCode: 'RWF', isoCurrencyCode: 'iso:RWF', symbol: 'Fr' },
  { currencyCode: 'SAR', isoCurrencyCode: 'iso:SAR', symbol: 'ر.س' },
  { currencyCode: 'SBD', isoCurrencyCode: 'iso:SBD', symbol: '$' },
  { currencyCode: 'SCR', isoCurrencyCode: 'iso:SCR', symbol: '₨' },
  { currencyCode: 'SDG', isoCurrencyCode: 'iso:SDG', symbol: 'ج.س.' },
  { currencyCode: 'SEK', isoCurrencyCode: 'iso:SEK', symbol: 'kr' },
  { currencyCode: 'SGD', isoCurrencyCode: 'iso:SGD', symbol: '$' },
  { currencyCode: 'SHP', isoCurrencyCode: 'iso:SHP', symbol: '£' },
  { currencyCode: 'SLL', isoCurrencyCode: 'iso:SLL', symbol: 'Le' },
  { currencyCode: 'SOS', isoCurrencyCode: 'iso:SOS', symbol: 'Sh' },
  { currencyCode: 'SRD', isoCurrencyCode: 'iso:SRD', symbol: '$' },
  { currencyCode: 'SSP', isoCurrencyCode: 'iso:SSP', symbol: '£' },
  { currencyCode: 'STD', isoCurrencyCode: 'iso:STD', symbol: 'Db' },
  { currencyCode: 'SYP', isoCurrencyCode: 'iso:SYP', symbol: 'ل.س' },
  { currencyCode: 'SZL', isoCurrencyCode: 'iso:SZL', symbol: 'L' },
  { currencyCode: 'THB', isoCurrencyCode: 'iso:THB', symbol: '฿' },
  { currencyCode: 'TJS', isoCurrencyCode: 'iso:TJS', symbol: 'ЅМ' },
  { currencyCode: 'TMT', isoCurrencyCode: 'iso:TMT', symbol: 'm' },
  { currencyCode: 'TND', isoCurrencyCode: 'iso:TND', symbol: 'د.ت' },
  { currencyCode: 'TOP', isoCurrencyCode: 'iso:TOP', symbol: 'T$' },
  { currencyCode: 'TRY', isoCurrencyCode: 'iso:TRY', symbol: '₺' },
  { currencyCode: 'TTD', isoCurrencyCode: 'iso:TTD', symbol: '$' },
  { currencyCode: 'TVD', isoCurrencyCode: 'iso:TVD', symbol: '$' },
  { currencyCode: 'TWD', isoCurrencyCode: 'iso:TWD', symbol: '$' },
  { currencyCode: 'TZS', isoCurrencyCode: 'iso:TZS', symbol: 'Sh' },
  { currencyCode: 'UAH', isoCurrencyCode: 'iso:UAH', symbol: '₴' },
  { currencyCode: 'UGX', isoCurrencyCode: 'iso:UGX', symbol: 'Sh' },
  { currencyCode: 'USD', isoCurrencyCode: 'iso:USD', symbol: '$' },
  { currencyCode: 'UYU', isoCurrencyCode: 'iso:UYU', symbol: '$' },
  { currencyCode: 'UZS', isoCurrencyCode: 'iso:UZS', symbol: '' },
  { currencyCode: 'VEF', isoCurrencyCode: 'iso:VEF', symbol: 'Bs' },
  { currencyCode: 'VND', isoCurrencyCode: 'iso:VND', symbol: '₫' },
  { currencyCode: 'VUV', isoCurrencyCode: 'iso:VUV', symbol: 'Vt' },
  { currencyCode: 'WST', isoCurrencyCode: 'iso:WST', symbol: 'T' },
  { currencyCode: 'XAF', isoCurrencyCode: 'iso:XAF', symbol: 'Fr' },
  { currencyCode: 'XCD', isoCurrencyCode: 'iso:XCD', symbol: '$' },
  { currencyCode: 'XOF', isoCurrencyCode: 'iso:XOF', symbol: 'Fr' },
  { currencyCode: 'XPF', isoCurrencyCode: 'iso:XPF', symbol: 'Fr' },
  { currencyCode: 'YER', isoCurrencyCode: 'iso:YER', symbol: '﷼' },
  { currencyCode: 'ZAR', isoCurrencyCode: 'iso:ZAR', symbol: 'R' },
  { currencyCode: 'ZMW', isoCurrencyCode: 'iso:ZMW', symbol: 'ZK' },
]

export const getFiatInfo = ({ currencyCode }: { currencyCode: string }) =>
  fiatCurrencyInfos.find((fiatInfo) => fiatInfo.isoCurrencyCode === currencyCode)

export const getCurrencyCodes = (wallet: EdgeCurrencyWallet) => {
  const {
    currencyInfo: { currencyCode, metaTokens },
  } = wallet

  return [currencyCode, ...metaTokens.map(({ currencyCode }) => currencyCode)]
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
