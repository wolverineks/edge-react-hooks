// @flow

import {} from 'ramda'

import { type EdgeAccount } from 'edge-core-js'
import { makeEdgeContext } from 'edge-core-js'
import { useEdgeContext, useMakeEdgeContext } from 'edge-react-hooks'
import React, { useEffect, useState } from 'react'

import { AccountInfo } from './AccountInfo.js'
import { ContextInfo } from './ContextInfo.js'
import { contextOptions } from './contextOptions.js'
import { LoginForm } from './LoginForm.js'

type Props = {||}
export const App = () => {
  useEdgeContext({}, [])
  return <div>Hello, World!</div>
}
// export const App = (props: Props) => {
//   // const { makeEdgeContext, context, pending } = useMakeEdgeContext()
//   const [context, setContext] = useState<?EdgeContext>(null)
//   useEffect(() => {
//     makeEdgeContext(contextOptions).then(setContext)
//   }, [])

//   useEdgeContext(context, [])

//   const [account, setAccount] = useState<?EdgeAccount>(null)

//   if (!context) {
//     return <div>LOADING...</div>
//   }

//   return (
//     <div>
//       <div>
//         <ContextInfo context={context} />
//       </div>

//       {/* {!account ? (
//         <LoginForm context={context} onLogin={setAccount} />
//       ) : (
//         <div>
//           <Buttons account={account} />
//           <AccountInfo account={account} onLogout={() => setAccount(null)} />
//         </div>
//       )} */}
//     </div>
//   )
// }

export default App

const Buttons = ({ account }: { account: EdgeAccount }) => {
  return (
    <div>
      <button onClick={() => account.disklet.delete('deletedWallets')}>DELETE DELETED WALLETS</button>
      <button onClick={() => account.disklet.delete('archivedWallets')}>DELETE ARCHIVED WALLETS</button>
      <button onClick={() => account.disklet.setText('deletedWallets', '{}')}>RESET DELETED WALLETS</button>
      <button onClick={() => account.disklet.setText('archivedWallets', '{}')}>RESET ARCHIVED WALLETS</button>
    </div>
  )
}
