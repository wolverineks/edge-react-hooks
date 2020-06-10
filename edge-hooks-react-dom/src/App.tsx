import 'bootstrap/dist/css/bootstrap.min.css'

import { EdgeContext } from 'edge-core-js'
import * as React from 'react'
import { Button, Container, Navbar, Tab, Tabs } from 'react-bootstrap'

import { AccountInfo } from './EdgeAccount/AccountInfo'
import { contextOptions } from './EdgeContext/contextOptions'
import { CreateAccountForm } from './EdgeContext/CreateAccountForm'
import { LoginForm } from './EdgeContext/LoginForm'
import { PinLogin } from './EdgeContext/PinLogin'
import { EdgeContextProvider, useContext } from './EdgeContext/useContext'
import { EdgeAccountProvider, useAccount, useSetAccount } from './Providers/AccountProvider'
import { SelectedWalletProvider } from './Providers/SelectedWalletProvider'
import { SettingsProvider } from './Providers/SettingsProvider'

export const Providers: React.FC = ({ children }) => (
  <EdgeContextProvider contextOptions={contextOptions}>
    <EdgeAccountProvider>
      <SettingsProvider>{children}</SettingsProvider>
    </EdgeAccountProvider>
  </EdgeContextProvider>
)

export const Inner = () => {
  const context = useContext()
  const account = useAccount()
  const setAccount = useSetAccount()

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
        <Login context={context} />
      ) : (
        <SelectedWalletProvider account={account}>
          <AccountInfo account={account} context={context} />
        </SelectedWalletProvider>
      )}
    </Container>
  )
}

const Login: React.FC<{ context: EdgeContext }> = ({ context }) => (
  <Tabs id={'loginCreateAccountTabs'} defaultActiveKey={'login'} transition={false}>
    <Tab eventKey={'login'} title={'Login'}>
      <LoginForm context={context} />
    </Tab>

    <Tab eventKey={'createAccount'} title={'Create Account'}>
      <CreateAccountForm context={context} />
    </Tab>

    <Tab eventKey={'pinLogin'} title={'Pin Login'}>
      <PinLogin context={context} />
    </Tab>
  </Tabs>
)

export const App = () => (
  <div>
    <Providers>
      <Inner />
    </Providers>
  </div>
)
