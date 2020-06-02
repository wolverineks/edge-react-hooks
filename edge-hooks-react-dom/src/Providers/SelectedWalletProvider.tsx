import { EdgeAccount, EdgeCurrencyWallet } from 'edge-core-js'
import React, { useContext, useState } from 'react'

const SelectedWalletContext = React.createContext<EdgeCurrencyWallet | undefined>(undefined)
const SelectWalletContext = React.createContext<(wallet: EdgeCurrencyWallet) => undefined>(() => undefined)

export const SelectedWalletProvider: React.FC<{ account: EdgeAccount }> = ({ account, children }) => {
  const [selectedWallet, setSelectedWallet] = useState<EdgeCurrencyWallet | undefined>()

  React.useEffect(() => {
    account.waitForCurrencyWallet(account.activeWalletIds[0]).then(setSelectedWallet)
  }, [account])

  return (
    <SelectedWalletContext.Provider value={selectedWallet}>
      <SelectWalletContext.Provider value={setSelectedWallet as (wallet: EdgeCurrencyWallet) => undefined}>
        {children}
      </SelectWalletContext.Provider>
    </SelectedWalletContext.Provider>
  )
}

export const useSelectedWallet = () => useContext(SelectedWalletContext)
export const useSelectWallet = () => useContext(SelectWalletContext)
