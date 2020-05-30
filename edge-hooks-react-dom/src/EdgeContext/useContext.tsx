import { EdgeContextOptions, addEdgeCorePlugins, lockEdgeCorePlugins } from 'edge-core-js'
import { EdgeCorePlugins } from 'edge-core-js'
import { EdgeContext } from 'edge-core-js'
import AccountBased from 'edge-currency-accountbased'
import Bitcoin from 'edge-currency-bitcoin'
import Monero from 'edge-currency-monero'
import exchangePlugins from 'edge-exchange-plugins'
import { useNewEdgeContext } from 'edge-react-hooks'
import * as React from 'react'

export const EdgeContextContext = React.createContext<EdgeContext | undefined>(undefined)

const plugins: EdgeCorePlugins[] = [Bitcoin, Monero, AccountBased, exchangePlugins]

export const EdgeContextProvider: React.FC<{ contextOptions: EdgeContextOptions }> = ({ children, contextOptions }) => {
  const { data: context } = useNewEdgeContext(contextOptions)

  React.useEffect(() => {
    if (!context) return
    plugins.forEach((plugin) => addEdgeCorePlugins(plugin))
    lockEdgeCorePlugins()
  }, [context, contextOptions])

  return <EdgeContextContext.Provider value={context}>{children}</EdgeContextContext.Provider>
}

export const useContext = () => React.useContext(EdgeContextContext)
