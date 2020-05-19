import { EdgeAccount, EdgeCurrencyWallet } from 'edge-core-js'
import React, { useContext, useState } from 'react'

const SelectedWalletContext = React.createContext<EdgeCurrencyWallet | undefined>(undefined)
const SelectWalletContext = React.createContext<(wallet: EdgeCurrencyWallet) => undefined>(() => undefined)

export const SelectedWalletProvider: React.FC<{ account: EdgeAccount }> = ({ account, children }) => {
  const firstWallet = account.currencyWallets[account.activeWalletIds[0]]
  const [selectedWallet, setSelectedWallet] = useState<EdgeCurrencyWallet | undefined>()

  return (
    <SelectedWalletContext.Provider value={selectedWallet || firstWallet}>
      <SelectWalletContext.Provider value={setSelectedWallet as (wallet: EdgeCurrencyWallet) => undefined}>
        {children}
      </SelectWalletContext.Provider>
    </SelectedWalletContext.Provider>
  )
}

export const useSelectedWallet = () => useContext(SelectedWalletContext)
export const useSelectWallet = () => useContext(SelectWalletContext)
