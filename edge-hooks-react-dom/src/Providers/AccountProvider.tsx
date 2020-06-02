import { EdgeAccount } from 'edge-core-js'
import * as React from 'react'

export const EdgeAccountContext = React.createContext<EdgeAccount | undefined>(undefined)
export const SetEdgeAccountContext = React.createContext<(account: EdgeAccount | undefined) => undefined>(
  () => undefined,
)

export const EdgeAccountProvider: React.FC = ({ children }) => {
  const [account, setAccount] = React.useState<EdgeAccount>()

  return (
    <EdgeAccountContext.Provider value={account}>
      <SetEdgeAccountContext.Provider value={setAccount as (account: EdgeAccount | undefined) => undefined}>
        {children}
      </SetEdgeAccountContext.Provider>
    </EdgeAccountContext.Provider>
  )
}

export const useAccount = () => React.useContext(EdgeAccountContext)
export const useSetAccount = () => React.useContext(SetEdgeAccountContext)
