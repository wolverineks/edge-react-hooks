import { EdgeAccount } from 'edge-core-js'
import * as React from 'react'

export const AccountContext = React.createContext<EdgeAccount | undefined>(undefined)
export const SetAccountContext = React.createContext<(account: EdgeAccount | undefined) => undefined>(() => undefined)

export const AccountProvider: React.FC = ({ children }) => {
  const [account, setAccount] = React.useState<EdgeAccount>()

  return (
    <AccountContext.Provider value={account}>
      <SetAccountContext.Provider value={setAccount as (account: EdgeAccount | undefined) => undefined}>
        {children}
      </SetAccountContext.Provider>
    </AccountContext.Provider>
  )
}

export const useAccount = () => React.useContext(AccountContext)
export const useSetAccount = () => React.useContext(SetAccountContext)
