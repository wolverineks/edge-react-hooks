import { EdgeAccount, EdgeDenomination } from 'edge-core-js'
import { useFile, useWrite } from 'edge-react-hooks'
import * as React from 'react'

import {
  EdgeCurrencySetting,
  EdgeSyncedSettings,
  defaultCurrencySetting,
  defaultSyncedSettings,
  useLoadAccountSetting,
  useLoadCurrencySetting,
} from '../Providers/SettingsProvider'
import { getAccountBalance } from './utils'

export const useWriteCurrencySetting = (account: EdgeAccount, { currencyCode }: { currencyCode: string }) =>
  useWrite<EdgeCurrencySetting>(account.disklet, { path: `Settings/Currencies/${currencyCode}.json` })

export const useReadCurrencySetting = (account: EdgeAccount, { currencyCode }: { currencyCode: string }) => {
  const write = useWriteCurrencySetting(account, { currencyCode })
  const read = useFile<EdgeCurrencySetting>(account.disklet, { path: `Settings/Currencies/${currencyCode}.json` })
  useLoadCurrencySetting({ key: currencyCode, value: read.data })

  React.useEffect(() => {
    if (read.error) {
      write.execute({ data: defaultCurrencySetting }).then(() => read.execute())
    }
  }, [read, read.error, write])

  return read
}

export const useCurrencySetting = (account: EdgeAccount, { currencyCode }: { currencyCode: string }) => ({
  read: useReadCurrencySetting(account, { currencyCode }),
  write: useWriteCurrencySetting(account, { currencyCode }),
})

export const useDisplayDenomination = (
  account: EdgeAccount,
  { currencyInfo }: { currencyInfo: { currencyCode: string; denominations: EdgeDenomination[] } },
) => {
  const { read } = useCurrencySetting(account, { currencyCode: currencyInfo.currencyCode })

  const denomination =
    currencyInfo.denominations.find(
      (denomination) => denomination.multiplier === read.data?.displayDenominationMultiplier,
    ) || currencyInfo.denominations[0]

  return denomination
}

export const useReadSyncedSettings = (account: EdgeAccount) =>
  useFile<EdgeSyncedSettings>(account.disklet, { path: 'Settings.json' })

export const useWriteSyncedSettings = (account: EdgeAccount) =>
  useWrite<EdgeSyncedSettings>(account.disklet, { path: 'Settings.json' })

export const useReadLocalSettings = (account: EdgeAccount) => useFile(account.localDisklet, { path: 'Settings.json' })

export const useWriteLocalSettings = (account: EdgeAccount) => useWrite(account.localDisklet, { path: 'Settings.json' })

export const useWriteDefaultFiatCurrencyCode = (account: EdgeAccount) =>
  useWrite<string>(account.disklet, { path: 'Settings/DefaultFiatCurrencyCode.json' })

export const useReadDefaultFiatCurrencyCode = (account: EdgeAccount) => {
  const write = useWriteDefaultFiatCurrencyCode(account)
  const read = useFile<string>(account.disklet, { path: 'Settings/DefaultFiatCurrencyCode.json' })
  useLoadAccountSetting({ key: 'defaultFiatCurrencyCode', value: read.data })

  React.useEffect(() => {
    if (read.error) {
      write.execute({ data: defaultSyncedSettings.defaultFiatCurrencyCode }).then(() => read.execute())
    }
  }, [read.error, read.data, read, write])

  return read
}

export const useDefaultFiatCurrencyCode = (account: EdgeAccount) => ({
  read: useReadDefaultFiatCurrencyCode(account),
  write: useWriteDefaultFiatCurrencyCode(account),
})

export const useAccountBalance = (account: EdgeAccount) => {
  const [balance, setBalance] = React.useState(0)
  const toCurrencyCode = useDefaultFiatCurrencyCode(account)

  React.useEffect(() => {
    // subscribe to each of the wallets balances, newTransactions, transactionsChanged??
    toCurrencyCode.read.data &&
      getAccountBalance(account, { toCurrencyCode: toCurrencyCode.read.data }).then(setBalance)
  }, [account, toCurrencyCode.read.data])

  return balance
}
