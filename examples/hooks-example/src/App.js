import {} from 'ramda'

import * as React from 'react'

import { AccountInfo } from './EdgeAccount/AccountInfo.js'
import { ContextInfo } from './EdgeContext/ContextInfo.js'
import { LoginForm } from './EdgeContext/LoginForm.js'
import { CreateAccountForm } from './EdgeContext/CreateAccountForm.js'
import { ContextProvider, useContext } from './EdgeContext/useContext.js'
import { AccountProvider, useAccount, useSetAccount } from './EdgeAccount/useAccount.js'
import { SelectedWalletProvider } from './EdgeCurrencyWallet/useSelectedWallet.js'
import { contextOptions } from './EdgeContext/contextOptions.js'

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
    context.on('loginStart', (accountName) => console.log({ accountName }))
    context.on('login', (account: EdgeAccount) => setAccount(account))
  }, [context, setAccount])

  if (!context) return 'Loading...'

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
