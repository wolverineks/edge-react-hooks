


import * as React from 'react'

export const AccountContext = React.createContext<?EdgeAccount>()
export const SetAccountContext = React.createContext<(context: ?EdgeAccount) => void>()

export const AccountProvider: React.FC = ({ children }) => {
  const [account, setAccount] = React.useState<?EdgeAccount>()

  return (
    <AccountContext.Provider value={account}>
      <SetAccountContext.Provider value={setAccount}>{children}</SetAccountContext.Provider>
    </AccountContext.Provider>
  )
}

export const useAccount = () => React.useContext(AccountContext)
export const useSetAccount = () => React.useContext(SetAccountContext)
