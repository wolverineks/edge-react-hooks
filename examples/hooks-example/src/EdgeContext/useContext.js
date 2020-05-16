

import { type EdgeContext, addEdgeCorePlugins, lockEdgeCorePlugins, makeEdgeContext } from 'edge-core-js'
import * as React from 'react'
// import AccountBased from 'edge-currency-accountbased'
import Bitcoin from 'edge-currency-bitcoin'
import Monero from 'edge-currency-monero'

export const ContextContext = React.createContext<?EdgeContext>()
export const SetContextContext = React.createContext<(context: ?EdgeContext) => void>()

const plugins = [
  Bitcoin,
  Monero,
  // AccountBased
]

export const ContextProvider: React.FC<{ contextOptions: Object }> = ({ children, contextOptions }) => {
  const [context, setContext] = React.useState<?EdgeContext>()

  React.useEffect(() => {
    const setup = async () => {
      const context = await makeEdgeContext(contextOptions)
      setContext(context)
      plugins.forEach((plugin) => addEdgeCorePlugins(plugin))
      lockEdgeCorePlugins()
    }

    setup()
  }, [contextOptions])

  React.useEffect(() => (context ? context.on('close', () => setContext()) : undefined), [context])

  return (
    <ContextContext.Provider value={context}>
      <SetContextContext.Provider value={setContext}>{children}</SetContextContext.Provider>
    </ContextContext.Provider>
  )
}

export const useContext = () => React.useContext(ContextContext)
export const useSetContext = () => React.useContext(SetContextContext)
