// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import React, { type Node, useContext, useState } from 'react'

const SelectedWalletContext = React.createContext<?EdgeCurrencyWallet>()
const SelectWalletContext = React.createContext((wallet: EdgeCurrencyWallet) => void 0)

export const SelectedWalletProvider = ({ children }: { children: Node }) => {
  const [selectedWallet, selectWallet] = useState<?EdgeCurrencyWallet>()
  return (
    <SelectedWalletContext.Provider value={selectedWallet}>
      <SelectWalletContext.Provider value={selectWallet}>{children}</SelectWalletContext.Provider>
    </SelectedWalletContext.Provider>
  )
}

export const useSelectedWallet = () => {
  const selectedWallet = useContext(SelectedWalletContext)

  return selectedWallet
}

export const useSelectWallet = () => {
  const selectWallet = useContext(SelectWalletContext)

  return selectWallet
}
