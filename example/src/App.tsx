import { EdgeAccount } from 'edge-core-js'
import * as React from 'react'

import { AccountInfo } from './EdgeAccount/AccountInfo'
import { AccountProvider, useAccount, useSetAccount } from './EdgeAccount/useAccount'
import { ContextInfo } from './EdgeContext/ContextInfo'
import { contextOptions } from './EdgeContext/contextOptions'
import { CreateAccountForm } from './EdgeContext/CreateAccountForm'
import { LoginForm } from './EdgeContext/LoginForm'
import { ContextProvider, useContext } from './EdgeContext/useContext'
import { SelectedWalletProvider } from './EdgeCurrencyWallet/useSelectedWallet'

export const Providers: React.FC = ({ children }) => (
  <ContextProvider contextOptions={contextOptions}>
    <AccountProvider>{children}</AccountProvider>
  </ContextProvider>
)

export const Inner = () => {
  const context = useContext()
  const account = useAccount()
  const setAccount = useSetAccount()

  React.useEffect(() => {
    if (!context) return
    context.on('loginStart', (accountName: any) => console.log({ accountName }))
    context.on('login', ((account: EdgeAccount) => setAccount(account)) as any)
  }, [context, setAccount])

  if (!context) return <div>Loading...</div>

  return (
    <div>
      <div>
        <ContextInfo context={context} />
      </div>
      <div>
        <hr />

        {!account || !account.loggedIn ? (
          <div>
            <LoginForm context={context} onLogin={setAccount} />
            <CreateAccountForm context={context} onCreate={setAccount} />
          </div>
        ) : (
          <div>
            <SelectedWalletProvider account={account}>
              <AccountInfo account={account} />
            </SelectedWalletProvider>
          </div>
        )}
      </div>
    </div>
  )
}

export const App = () => (
  <div>
    <Providers>
      <Inner />
    </Providers>
  </div>
)
