import { EdgeMetaToken } from 'edge-core-js'
import * as React from 'react'

export type LoadAccountSetting = <T extends keyof EdgeSyncedSettings>({
  key,
  value,
}: {
  key: T
  value: EdgeSyncedSettings[T] | undefined
}) => void
export type LoadCurrencySetting = ({ key, value }: { key: string; value: EdgeCurrencySetting | undefined }) => void

export const AccountSettingsContext = React.createContext<Partial<EdgeSyncedSettings>>({})
export const LoadAccountSettingContext = React.createContext<LoadAccountSetting>(() => undefined)
export const CurrencySettingsContext = React.createContext<Partial<EdgeCurrencySettings>>({})
export const LoadCurrencySettingContext = React.createContext<LoadCurrencySetting>(() => undefined)

export const SettingsProvider: React.FC = ({ children }) => {
  const [settings, setSettings] = React.useState({})
  const [currencySettings, setCurrencySettings] = React.useState({})

  const loadAccountSetting: LoadAccountSetting = React.useCallback(
    ({ key, value }) => setSettings((state) => ({ ...state, [key]: value })),
    [],
  )

  const loadCurrencySetting: LoadCurrencySetting = React.useCallback(
    ({ key, value }) => setCurrencySettings((state) => ({ ...state, [key]: value })),
    [],
  )

  return (
    <AccountSettingsContext.Provider value={settings}>
      <LoadAccountSettingContext.Provider value={loadAccountSetting}>
        <CurrencySettingsContext.Provider value={currencySettings}>
          <LoadCurrencySettingContext.Provider value={loadCurrencySetting}>
            {children}
          </LoadCurrencySettingContext.Provider>
        </CurrencySettingsContext.Provider>
      </LoadAccountSettingContext.Provider>
    </AccountSettingsContext.Provider>
  )
}

export const useAccountSettings = () => React.useContext(AccountSettingsContext)
export const useLoadAccountSettingContext = () => React.useContext(LoadAccountSettingContext)
export const useLoadAccountSetting: LoadAccountSetting = ({ key, value }) => {
  const loadSetting = useLoadAccountSettingContext()

  React.useEffect(() => {
    value && loadSetting({ key, value })
  }, [loadSetting, key, value])
}

export const useCurrencySettings = () => React.useContext(CurrencySettingsContext)
export const useCurrencySetting = ({ currencyCode }: { currencyCode: string }) => {
  const currencySettings = useCurrencySettings()
  if (!currencySettings || !currencySettings[currencyCode as keyof EdgeCurrencySettings]) return

  return currencySettings[currencyCode as keyof EdgeCurrencySettings]
}
export const useLoadCurrencySettingContext = () => React.useContext(LoadCurrencySettingContext)
export const useLoadCurrencySetting: LoadCurrencySetting = ({ key, value }) => {
  const loadCurrencySetting = useLoadCurrencySettingContext()

  React.useEffect(() => {
    value && loadCurrencySetting({ key, value })
  }, [loadCurrencySetting, key, value])
}

export type EdgeCurrencySetting = {
  displayDenominationMultiplier: string
}

export interface PasswordReminders {
  '20': boolean
  '200': boolean
  '2000': boolean
  '20000': boolean
  '200000': boolean
}

export interface EdgeSyncedSettings {
  autoLogoutDelay: number
  defaultFiatCurrencyCode: string
  merchantMode: boolean
  preferredSwapPluginId: string
  countryCode: string
  customTokens: EdgeMetaToken[]
  recentWalletIds: string[]
  passwordReminders: PasswordReminders
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

export const passwordReminders = {
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
  recentWalletIds: [],
  passwordReminders,
}
