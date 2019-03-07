// @flow

import {} from 'ramda'

import {
  type EdgeAccount,
  addEdgeCorePlugins,
  lockEdgeCorePlugins,
  makeEdgeContext,
  makeFakeEdgeWorld,
} from 'edge-core-js'
import AccountBased from 'edge-currency-accountbased'
import Bitcoin from 'edge-currency-bitcoin'
import { useLogout, useMakeEdgeContext } from 'edge-react-hooks'
import React, { useEffect, useReducer, useRef, useState } from 'react'

import { AccountInfo } from './AccountInfo.js'
import { ContextInfo } from './ContextInfo.js'
import { contextOptions } from './contextOptions.js'
import { LoginForm } from './LoginForm.js'

type Props = {||}

// const App = () => {
//   const [count, setCount] = useState(0)
//   const [delay, setDelay] = useState(1000)
//   const [pause, setPause] = useState(false)
//   const interval = useInterval()

//   useEffect(() => {
//     interval(() => setCount(state => state + 1), pause ? null : delay)
//   }, [delay, pause])

//   return (
//     <div>
//       <h1>{count}</h1>
//       <input value={delay} onChange={event => setDelay(event.currentTarget.value)} />
//       <input type={'checkbox'} value={pause} onChange={event => setPause(event.target.checked)} />
//     </div>
//   )
// }

// type State = { callback: ?() => mixed, delay: ?number }
// type Action = { type: 'UPDATE', callback: ?() => mixed, delay: ?number }
// const useTimeout = () => {
//   const [{ callback, delay }, dispatch] = useReducer<State, Action>(
//     (state, action) => (action.type === 'UPDATE' ? { callback: action.callback, delay: action.delay } : state),
//     { callback: void 0, delay: void 0 },
//   )

//   useEffect(() => {
//     if (!callback || delay == null) return
//     const id = setTimeout(callback, delay)
//     return () => clearTimeout(id)
//   }, [callback, delay])

//   const timeout = (callback: () => mixed, delay: ?number) => {
//     dispatch({ type: 'UPDATE', callback, delay })
//   }

//   return timeout
// }

// const useInterval = () => {
//   const [{ callback, delay }, dispatch] = useReducer<State, Action>(
//     (state, action) => (action.type === 'UPDATE' ? { callback: action.callback, delay: action.delay } : state),
//     { callback: void 0, delay: void 0 },
//   )

//   useEffect(() => {
//     if (!callback || delay == null) return
//     const id = setInterval(callback, delay)
//     return () => clearInterval(id)
//   }, [callback, delay])

//   const interval = (callback: () => mixed, delay?: ?number) => {
//     dispatch({ type: 'UPDATE', callback, delay })
//   }

//   return interval
// }

const plugins = [Bitcoin, AccountBased]

export const App = (props: Props) => {
  const { makeEdgeContext, context, error, pending } = useMakeEdgeContext()
  const [pluginsLoaded, setPluginsLoaded] = useState(false)

  useEffect(() => {
    makeEdgeContext(contextOptions)
  }, [])

  useEffect(() => {
    if (!context) return
    plugins.forEach(plugin => addEdgeCorePlugins(plugin))
    lockEdgeCorePlugins()
    setPluginsLoaded(true)
  }, [context])

  const { logout } = useLogout()
  const [account, setAccount] = useState<?EdgeAccount>(null)

  if (error) return <div>{error.message}</div>
  if (pending || !context || !pluginsLoaded) return <div>LOADING...</div>

  return (
    <div>
      <div>
        <ContextInfo context={context} />
      </div>

      <hr />

      {!account || !account.loggedIn ? (
        <LoginForm context={context} onLogin={setAccount} />
      ) : (
        <div>
          <AccountInfo account={account} logout={() => logout(account)} />
        </div>
      )}
    </div>
  )
}

export default App
