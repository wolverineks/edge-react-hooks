// @flow

import { type EdgeContext } from 'edge-core-js'
import React, { type Node, useState } from 'react'

export const ContextContext = React.createContext<?EdgeContext>()
export const SetContextContext = React.createContext<(EdgeContext) => void>((context: EdgeContext) => void 0)

export const ContextProvider = ({ children }: { children: Node }) => {
  const [context, _setContext] = useState<?EdgeContext>()

  const setContext = (context: EdgeContext) => {
    _setContext(context)
  }

  return (
    <ContextContext.Provider value={context}>
      <SetContextContext.Provider value={setContext}>{children}</SetContextContext.Provider>
    </ContextContext.Provider>
  )
}

export const useContext = () => {
  const context = React.useContext(ContextContext)

  return context
}

export const useSetContext = () => {
  const setContext = React.useContext(SetContextContext)

  return setContext
}
