

import { type EdgeCurrencyWallet, type EdgeAccount } from 'edge-core-js'
import React, { useContext, useState } from 'react'
import { useEdgeAccount } from 'edge-react-hooks'

const SelectedWalletContext = React.createContext<?EdgeCurrencyWallet>()
const SelectWalletContext = React.createContext((wallet: EdgeCurrencyWallet) => void 0)

export const SelectedWalletProvider: React.FC<{ account: EdgeAccount }> = ({ account, children }) => {
  const firstWallet = account.currencyWallets[account.activeWalletIds[0]]
  const [selectedWallet, setSelectedWallet] = useState<?EdgeCurrencyWallet>()

  useEdgeAccount(account)

  return (
    <SelectedWalletContext.Provider value={selectedWallet || firstWallet}>
      <SelectWalletContext.Provider value={setSelectedWallet}>{children}</SelectWalletContext.Provider>
    </SelectedWalletContext.Provider>
  )
}

export const useSelectedWallet = () => useContext(SelectedWalletContext)
export const useSelectWallet = () => useContext(SelectWalletContext)
