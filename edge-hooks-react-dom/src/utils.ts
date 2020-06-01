import {
  EdgeAccount,
  EdgeContext,
  EdgeCurrencyInfo,
  EdgeCurrencyWallet,
  EdgeWalletInfo,
  EdgeWalletInfoFull,
} from 'edge-core-js'
import { useFile, useWrite } from 'edge-react-hooks'
import * as React from 'react'
import { useMutation } from 'react-query'

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

export const getFiatInfo = ({ currencyCode }: { currencyCode: string }) =>
  fiatCurrencyInfos.find((fiatInfo) => fiatInfo.isoCurrencyCode.includes(currencyCode))

export const getCurrencyCodes = (wallet: EdgeCurrencyWallet) => {
  const {
    currencyInfo: { currencyCode, metaTokens },
  } = wallet

  return [currencyCode, ...metaTokens.map(({ currencyCode }) => currencyCode)]
}

// export const useDisplayDenomination = (account: EdgeAccount, { currencyInfo }: { currencyInfo: EdgeCurrencyInfo }) => {
//   const read = useCurrencySetting(account, { currencyCode: currencyInfo.currencyCode as any })

//   return currencyInfo?.denominations.find(
//     ({ multiplier }) => multiplier === (currencySetting as EdgeCurrencySetting).displayDenominationMultiplier,
//   )
// }

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

export const useReadSyncedSettings = (account: EdgeAccount) =>
  useFile<EdgeSyncedSettings>(account.disklet, {
    path: 'Settings.json',
    parse: JSON.parse,
  })

export const useWriteSyncedSettings = (account: EdgeAccount) =>
  useWrite<EdgeSyncedSettings>(account.disklet, {
    path: 'Settings.json',
    stringify: JSON.stringify,
  })

export const useReadLocalSettings = (account: EdgeAccount) =>
  useFile(account.localDisklet, {
    path: 'Settings.json',
    parse: JSON.parse,
  })

export const useWriteLocalSettings = (account: EdgeAccount) =>
  useWrite(account.localDisklet, {
    path: 'Settings.json',
    stringify: JSON.stringify,
  })

export const useWriteDefaultFiatCurrencyCode = (account: EdgeAccount) =>
  useWrite<string>(account.disklet, {
    path: 'Settings/DefaultFiatCurrencyCode.json',
    stringify: JSON.stringify,
  })

export const useReadDefaultFiatCurrencyCode = (account: EdgeAccount) => {
  const write = useWriteDefaultFiatCurrencyCode(account)
  const read = useFile<string>(account.disklet, {
    path: 'Settings/DefaultFiatCurrencyCode.json',
    parse: JSON.parse,
  })

  React.useEffect(() => {
    if (read.error) {
      write.execute({ data: defaultSyncedSettings.defaultFiatCurrencyCode }).then(() => read.execute())
    }
  }, [read.error, read.data])

  return read
}

export const useDefaultFiatCurrencyCode = (account: EdgeAccount) => ({
  read: useReadDefaultFiatCurrencyCode(account),
  write: useWriteDefaultFiatCurrencyCode(account),
})

export const useWriteCurrencySetting = (
  account: EdgeAccount,
  { currencyCode }: { currencyCode: keyof EdgeCurrencySettings },
) =>
  useWrite<EdgeCurrencySetting>(account.disklet, {
    path: `Settings/Currencies/${currencyCode}.json`,
    stringify: JSON.stringify,
  })

export const useReadCurrencySetting = (
  account: EdgeAccount,
  { currencyCode }: { currencyCode: keyof EdgeCurrencySettings },
) => {
  const write = useWriteCurrencySetting(account, { currencyCode })
  const read = useFile<EdgeCurrencySetting>(account.disklet, {
    path: `Settings/Currencies/${currencyCode}.json`,
    parse: JSON.parse,
  })

  React.useEffect(() => {
    if (read.error) {
      write.execute({ data: defaultCurrencySetting }).then(() => read.execute())
    }
  }, [read.error])

  return read
}

export const useCurrencySetting = (
  account: EdgeAccount,
  { currencyCode }: { currencyCode: keyof EdgeCurrencySettings },
) => ({
  read: useReadCurrencySetting(account, { currencyCode }),
  write: useWriteCurrencySetting(account, { currencyCode }),
})

export const useWriteAutoLogoutDelay = (account: EdgeAccount) =>
  useWrite<number>(account.disklet, {
    path: `Settings/AutoLogoutDelay.json`,
    stringify: JSON.stringify,
  })

export const useReadAutoLogoutDelay = (account: EdgeAccount) => {
  const write = useWriteAutoLogoutDelay(account)
  const read = useFile<number>(account.disklet, {
    path: `Settings/AutoLogoutDelay.json`,
    parse: JSON.parse,
  })

  React.useEffect(() => {
    if (read.error) {
      write.execute({ data: defaultSyncedSettings.autoLogoutDelay }).then(() => read.execute())
    }
  }, [read.error])

  return read
}

export const useAutologoutDelay = (account: EdgeAccount) => ({
  read: useReadAutoLogoutDelay(account),
  write: useWriteAutoLogoutDelay(account),
})

export const fiatCurrencyInfos = [
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

export type EdgeCurrencySetting = {
  displayDenominationMultiplier: string
}

export interface PasswordRecoveryReminderSettings {
  '20': boolean
  '200': boolean
  '2000': boolean
  '20000': boolean
  '200000': boolean
}

export interface EdgeSyncedSettings extends EdgeCurrencySettings {
  autoLogoutDelay: number
  defaultFiatCurrencyCode: string
  merchantMode: boolean
  preferredSwapPluginId: string
  countryCode: string
  customTokens: []
  mostRecentWallets: []
  passwordRecoveryRemindersShown: PasswordRecoveryReminderSettings
}

export interface EdgeCurrencySettings {
  // Chains
  BCH: EdgeCurrencySetting
  BNB: EdgeCurrencySetting
  BTC: EdgeCurrencySetting
  DASH: EdgeCurrencySetting
  DGB: EdgeCurrencySetting
  DOGE: EdgeCurrencySetting
  EOS: EdgeCurrencySetting
  ETH: EdgeCurrencySetting
  FTC: EdgeCurrencySetting
  LTC: EdgeCurrencySetting
  QTUM: EdgeCurrencySetting
  RBTC: EdgeCurrencySetting
  RVN: EdgeCurrencySetting
  SMART: EdgeCurrencySetting
  UFO: EdgeCurrencySetting
  VTC: EdgeCurrencySetting
  XLM: EdgeCurrencySetting
  XMR: EdgeCurrencySetting
  XRP: EdgeCurrencySetting
  XTZ: EdgeCurrencySetting
  XZC: EdgeCurrencySetting

  // Tokens?
  AGLD: EdgeCurrencySetting
  ANT: EdgeCurrencySetting
  BAT: EdgeCurrencySetting
  BNT: EdgeCurrencySetting
  BRZ: EdgeCurrencySetting
  CBAT: EdgeCurrencySetting
  CDAI: EdgeCurrencySetting
  CETH: EdgeCurrencySetting
  CREP: EdgeCurrencySetting
  CSAI: EdgeCurrencySetting
  CUSDC: EdgeCurrencySetting
  CWBTC: EdgeCurrencySetting
  CZRX: EdgeCurrencySetting
  DAI: EdgeCurrencySetting
  ETHBNT: EdgeCurrencySetting
  FUN: EdgeCurrencySetting
  GNO: EdgeCurrencySetting
  GNT: EdgeCurrencySetting
  GUSD: EdgeCurrencySetting
  HERC: EdgeCurrencySetting
  HUR: EdgeCurrencySetting
  IND: EdgeCurrencySetting
  KIN: EdgeCurrencySetting
  KNC: EdgeCurrencySetting
  LINK: EdgeCurrencySetting
  MANA: EdgeCurrencySetting
  MET: EdgeCurrencySetting
  MKR: EdgeCurrencySetting
  NEXO: EdgeCurrencySetting
  NMR: EdgeCurrencySetting
  OMG: EdgeCurrencySetting
  OXT: EdgeCurrencySetting
  PAX: EdgeCurrencySetting
  POLY: EdgeCurrencySetting
  REP: EdgeCurrencySetting
  RIF: EdgeCurrencySetting
  SAI: EdgeCurrencySetting
  SALT: EdgeCurrencySetting
  STORJ: EdgeCurrencySetting
  TUSD: EdgeCurrencySetting
  USDC: EdgeCurrencySetting
  USDS: EdgeCurrencySetting
  USDT: EdgeCurrencySetting
  WINGS: EdgeCurrencySetting
  ZRX: EdgeCurrencySetting
}

export const passwordRecoveryRemindersShown = {
  '20': false,
  '200': false,
  '2000': false,
  '20000': false,
  '200000': false,
}

export const defaultCurrencySetting = { displayDenominationMultiplier: '' }

export const defaultCurrencySettings = {
  // Chains
  BCH: { displayDenominationMultiplier: '' },
  BNB: { displayDenominationMultiplier: '' },
  BSV: { displayDenominationMultiplier: '' },
  BTC: { displayDenominationMultiplier: '' },
  BTG: { displayDenominationMultiplier: '' },
  DASH: { displayDenominationMultiplier: '' },
  DGB: { displayDenominationMultiplier: '' },
  DOGE: { displayDenominationMultiplier: '' },
  EOS: { displayDenominationMultiplier: '' },
  EBST: { displayDenominationMultiplier: '' },
  ETC: { displayDenominationMultiplier: '' },
  ETH: { displayDenominationMultiplier: '' },
  FIO: { displayDenominationMultiplier: '' },
  FTC: { displayDenominationMultiplier: '' },
  GRS: { displayDenominationMultiplier: '' },
  LTC: { displayDenominationMultiplier: '' },
  QTUM: { displayDenominationMultiplier: '' },
  RBTC: { displayDenominationMultiplier: '' },
  RVN: { displayDenominationMultiplier: '' },
  SMART: { displayDenominationMultiplier: '' },
  UFO: { displayDenominationMultiplier: '' },
  VTC: { displayDenominationMultiplier: '' },
  XLM: { displayDenominationMultiplier: '' },
  XMR: { displayDenominationMultiplier: '' },
  XRP: { displayDenominationMultiplier: '' },
  XTZ: { displayDenominationMultiplier: '' },
  XZC: { displayDenominationMultiplier: '' },

  // Tokens?
  AGLD: { displayDenominationMultiplier: '' },
  ANT: { displayDenominationMultiplier: '' },
  BAT: { displayDenominationMultiplier: '' },
  BNT: { displayDenominationMultiplier: '' },
  BRZ: { displayDenominationMultiplier: '' },
  CBAT: { displayDenominationMultiplier: '' },
  CDAI: { displayDenominationMultiplier: '' },
  CETH: { displayDenominationMultiplier: '' },
  CREP: { displayDenominationMultiplier: '' },
  CSAI: { displayDenominationMultiplier: '' },
  CUSDC: { displayDenominationMultiplier: '' },
  CWBTC: { displayDenominationMultiplier: '' },
  CZRX: { displayDenominationMultiplier: '' },
  DAI: { displayDenominationMultiplier: '' },
  ETHBNT: { displayDenominationMultiplier: '' },
  FUN: { displayDenominationMultiplier: '' },
  GNO: { displayDenominationMultiplier: '' },
  GNT: { displayDenominationMultiplier: '' },
  GUSD: { displayDenominationMultiplier: '' },
  HERC: { displayDenominationMultiplier: '' },
  HUR: { displayDenominationMultiplier: '' },
  IND: { displayDenominationMultiplier: '' },
  KIN: { displayDenominationMultiplier: '' },
  KNC: { displayDenominationMultiplier: '' },
  LINK: { displayDenominationMultiplier: '' },
  MANA: { displayDenominationMultiplier: '' },
  MET: { displayDenominationMultiplier: '' },
  MKR: { displayDenominationMultiplier: '' },
  NEXO: { displayDenominationMultiplier: '' },
  NMR: { displayDenominationMultiplier: '' },
  OMG: { displayDenominationMultiplier: '' },
  OXT: { displayDenominationMultiplier: '' },
  PAX: { displayDenominationMultiplier: '' },
  POLY: { displayDenominationMultiplier: '' },
  REP: { displayDenominationMultiplier: '' },
  RIF: { displayDenominationMultiplier: '' },
  SAI: { displayDenominationMultiplier: '' },
  SALT: { displayDenominationMultiplier: '' },
  STORJ: { displayDenominationMultiplier: '' },
  TBTC: { displayDenominationMultiplier: '' },
  TUSD: { displayDenominationMultiplier: '' },
  USDC: { displayDenominationMultiplier: '' },
  USDS: { displayDenominationMultiplier: '' },
  USDT: { displayDenominationMultiplier: '' },
  WINGS: { displayDenominationMultiplier: '' },
  ZRX: { displayDenominationMultiplier: '' },
}

export const defaultSyncedSettings: EdgeSyncedSettings = {
  autoLogoutDelay: 3600,
  defaultFiatCurrencyCode: 'iso:USD',
  merchantMode: false,
  preferredSwapPluginId: '',
  countryCode: '',
  customTokens: [],
  mostRecentWallets: [],
  passwordRecoveryRemindersShown,
  ...defaultCurrencySettings,
}
