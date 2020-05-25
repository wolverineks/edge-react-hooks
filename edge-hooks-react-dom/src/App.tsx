import 'bootstrap/dist/css/bootstrap.min.css'

import { EdgeAccount } from 'edge-core-js'
import * as React from 'react'
import { Button, Container, Navbar, Tab, Tabs } from 'react-bootstrap'

import { AccountInfo } from './EdgeAccount/AccountInfo'
import { EdgeAccountProvider, useAccount, useSetAccount } from './EdgeAccount/useAccount'
import { contextOptions } from './EdgeContext/contextOptions'
import { CreateAccountForm } from './EdgeContext/CreateAccountForm'
import { LoginForm } from './EdgeContext/LoginForm'
import { PinLogin } from './EdgeContext/PinLogin'
import { EdgeContextProvider, useContext } from './EdgeContext/useContext'
import { SelectedWalletProvider } from './EdgeCurrencyWallet/useSelectedWallet'

export const Providers: React.FC = ({ children }) => (
  <EdgeContextProvider contextOptions={contextOptions}>
    <EdgeAccountProvider>{children}</EdgeAccountProvider>
  </EdgeContextProvider>
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
    <Container>
      <Navbar>
        <Navbar.Brand>Edge</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {account && account.loggedIn && <Navbar.Text>{account.username}</Navbar.Text>}
          {account && account.loggedIn && (
            <Button
              variant={'warning'}
              onClick={() => {
                setAccount(undefined)
                account.logout()
              }}
            >
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Navbar>

      {!account || !account.loggedIn ? (
        <Tabs id={'loginCreateAccountTabs'} defaultActiveKey={'login'} transition={false}>
          <Tab eventKey={'login'} title={'Login'}>
            <LoginForm context={context} onLogin={setAccount} />
          </Tab>

          <Tab eventKey={'createAccount'} title={'Create Account'}>
            <CreateAccountForm context={context} onCreate={setAccount} />
          </Tab>

          <Tab eventKey={'pinLogin'} title={'Pin Login'}>
            <PinLogin context={context} onLogin={setAccount} />
          </Tab>
        </Tabs>
      ) : (
        <div>
          <SelectedWalletProvider account={account}>
            <AccountInfo account={account} />
          </SelectedWalletProvider>
        </div>
      )}
    </Container>
  )
}

export const App = () => (
  <div>
    <Providers>
      <Inner />
    </Providers>
  </div>
)
