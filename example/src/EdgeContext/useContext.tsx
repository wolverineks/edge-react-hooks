import { addEdgeCorePlugins, lockEdgeCorePlugins, makeEdgeContext } from 'edge-core-js'
import { EdgeCorePlugins } from 'edge-core-js'
import { EdgeContext } from 'edge-core-js'
// import AccountBased from 'edge-currency-accountbased'
import Bitcoin from 'edge-currency-bitcoin'
import Monero from 'edge-currency-monero'
import { useEdgeContext } from 'edge-react-hooks'
import * as React from 'react'

export const ContextContext = React.createContext<EdgeContext | undefined>(undefined)

const plugins: EdgeCorePlugins[] = [
  Bitcoin,
  Monero,
  // AccountBased
]

export const ContextProvider: React.FC<{ contextOptions: Parameters<typeof makeEdgeContext>[0] }> = ({
  children,
  contextOptions,
}) => {
  const { context } = useEdgeContext(contextOptions)

  React.useEffect(() => {
    if (!context) return
    plugins.forEach((plugin) => addEdgeCorePlugins(plugin))
    lockEdgeCorePlugins()
  }, [context, contextOptions])

  return <ContextContext.Provider value={context}>{children}</ContextContext.Provider>
}

export const useContext = () => React.useContext(ContextContext)
