// @flow

import {} from 'ramda'

import { type EdgeAccount, addEdgeCorePlugins, lockEdgeCorePlugins } from 'edge-core-js'
import AccountBased from 'edge-currency-accountbased'
import Bitcoin from 'edge-currency-bitcoin'
import { useLogout, useMakeEdgeContext } from 'edge-react-hooks'
import React, { useEffect, useRef, useState } from 'react'

import { AccountInfo } from './AccountInfo.js'
import { ContextInfo } from './ContextInfo.js'
import { contextOptions } from './contextOptions.js'
import { LoginForm } from './LoginForm.js'
import { ContextContext } from './useContext.js'
import { SelectedWalletProvider } from './useSelectedWallet.js'

const plugins = [Bitcoin, AccountBased]

type Props = {||}

export const App = (props: Props) => {
  const { logout } = useLogout()
  const [account, setAccount] = useState<?EdgeAccount>(void 0)
  const { makeEdgeContext, context } = useMakeEdgeContext()
  const pluginsLoaded = useRef(false)

  useEffect(() => {
    setTimeout(() => makeEdgeContext(contextOptions), 1000)
  }, [])

  useEffect(() => {
    if (!context || pluginsLoaded) return
    plugins.forEach(plugin => addEdgeCorePlugins(plugin))
    lockEdgeCorePlugins()
    pluginsLoaded.current = true
  }, [context])

  if (!context) return 'Loading...'

  return (
    <div>
      <ContextContext.Provider value={context}>
        <div>
          <ContextInfo context={context} />
        </div>
        <div>
          <hr />

          {!account || !account.loggedIn ? (
            <LoginForm context={context} onLogin={setAccount} />
          ) : (
            <div>
              <SelectedWalletProvider>
                <AccountInfo account={account} logout={() => logout(account)} />
              </SelectedWalletProvider>
            </div>
          )}
        </div>
        }
      </ContextContext.Provider>
    </div>
  )
}

export default App

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
