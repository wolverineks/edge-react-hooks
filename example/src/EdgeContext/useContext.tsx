import { addEdgeCorePlugins, lockEdgeCorePlugins, makeEdgeContext } from 'edge-core-js'
import * as React from 'react'
// import AccountBased from 'edge-currency-accountbased'
import Bitcoin from 'edge-currency-bitcoin'
import Monero from 'edge-currency-monero'

import { EdgeContext } from '../../../src/types'

export const ContextContext = React.createContext<EdgeContext | undefined>(undefined)
export const SetContextContext = React.createContext<(context: EdgeContext | undefined) => undefined>(() => undefined)

const plugins: any[] = [
  Bitcoin,
  Monero,
  // AccountBased
]

export const ContextProvider: React.FC<{ contextOptions: Parameters<typeof makeEdgeContext>[0] }> = ({
  children,
  contextOptions,
}) => {
  const [context, setContext] = React.useState<EdgeContext | undefined>(undefined)

  React.useEffect(() => {
    makeEdgeContext(contextOptions)
      .then(setContext)
      .then(() => {
        plugins.forEach((plugin) => addEdgeCorePlugins(plugin))
        lockEdgeCorePlugins()
      })
  }, [contextOptions])

  React.useEffect(() => {
    if (!context) return
    context.on('close', () => setContext(undefined))
  }, [context])

  return (
    <ContextContext.Provider value={context}>
      <SetContextContext.Provider value={setContext as (context: EdgeContext | undefined) => undefined}>
        {children}
      </SetContextContext.Provider>
    </ContextContext.Provider>
  )
}

export const useContext = () => React.useContext(ContextContext)
export const useSetContext = () => React.useContext(SetContextContext)
