import { EdgeAccount, EdgeCurrencyWallet } from 'edge-core-js'
import {
  useEdgeAccount,
  useEdgeCurrencyWallet,
  useEnableTokens,
  useEnabledTokens,
  useOnNewTransactions,
  useRenameWallet,
  useSetFiatCurrencyCode,
} from 'edge-react-hooks'
import * as React from 'react'
import { Alert, Button, Card, Form, FormControl, FormGroup, FormLabel, ListGroup, Tab, Tabs } from 'react-bootstrap'

import { Disklet } from '../Disklet/Disklet'
import { BalanceList } from '../EdgeAccount/BalanceList'
import { fiatCurrencyInfos } from '../utils'
import { Request } from './Request'
import { Send } from './Send'
import { TransactionList } from './TransactionList'

export const WalletInfo: React.FC<{ wallet: EdgeCurrencyWallet; account: EdgeAccount }> = ({ wallet, account }) => {
  useEdgeCurrencyWallet(wallet)
  useEdgeAccount(account)
  useOnNewTransactions(
    wallet,
    (transactions) => transactions && alert(transactions.length > 1 ? 'New Transactions' : 'New Transaction'),
  )

  return (
    <Tabs id={'walletTabs'} defaultActiveKey={'details'}>
      <Tab eventKey={'details'} title={'Details'}>
        <WalletOptions wallet={wallet} />
        <DisplayKeys wallet={wallet} />
        <BalanceList wallet={wallet} account={account} />
        <EnabledTokens wallet={wallet} />
        <EnableTokens wallet={wallet} />
        <Disklet disklet={wallet.disklet} title={'Disklet'} />
        <Disklet disklet={wallet.localDisklet} title={'Local Disklet'} />
      </Tab>

      <Tab eventKey={'transactions'} title={'History'}>
        <TransactionList key={wallet.id} wallet={wallet} />
      </Tab>

      <Tab eventKey={'send'} title={'Send'}>
        <Send wallet={wallet} />
      </Tab>

      <Tab eventKey={'request'} title={'Request'}>
        <Request wallet={wallet} />
      </Tab>
    </Tabs>
  )
}

const EnabledTokens: React.FC<{ wallet: EdgeCurrencyWallet }> = ({ wallet }) => {
  useEdgeCurrencyWallet(wallet)

  const { data: enabledTokens } = useEnabledTokens(wallet)

  return (
    <Card>
      <Card.Header>
        <Card.Title>Enabled Tokens</Card.Title>
      </Card.Header>

      <Card.Body>
        {!enabledTokens ? (
          <Card.Text>Loading...</Card.Text>
        ) : enabledTokens.length <= 0 ? (
          <Card.Text>No Tokens Enabled</Card.Text>
        ) : (
          <ListGroup>
            {enabledTokens.map((token) => (
              <ListGroup.Item key={token}>{token}</ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  )
}

const EnableTokens: React.FC<{ wallet: EdgeCurrencyWallet }> = ({ wallet }) => {
  useEdgeCurrencyWallet(wallet)

  const availableTokens = wallet.currencyInfo.metaTokens

  const { execute: enableTokens } = useEnableTokens(wallet)

  return (
    <Card>
      <Card.Header>
        <Card.Title>Enable Tokens</Card.Title>
      </Card.Header>

      <Card.Body>
        {availableTokens.length >= 0 ? (
          <Card.Text>No Tokens Available</Card.Text>
        ) : (
          <ListGroup>
            {availableTokens.map((token) => (
              <ListGroup.Item key={token.currencyCode}>
                <Button onClick={() => enableTokens({ tokens: [token.currencyCode] })}>
                  {token.currencyName} - {token.currencyCode}
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  )
}

const RenameWallet: React.FC<{ wallet: EdgeCurrencyWallet }> = ({ wallet }) => {
  useEdgeCurrencyWallet(wallet)
  const [walletName, setWalletName] = React.useState<string>(wallet.name || '')
  const { execute, status } = useRenameWallet(wallet)

  return (
    <FormGroup>
      <Form.Label>Wallet Name</Form.Label>
      <FormControl value={walletName} onChange={(event) => setWalletName(event.currentTarget.value)} />
      <Button onClick={() => execute({ name: walletName })} disabled={status === 'loading'}>
        Rename
      </Button>
    </FormGroup>
  )
}

const SetFiatCurrencyCode: React.FC<{ wallet: EdgeCurrencyWallet }> = ({ wallet }) => {
  useEdgeCurrencyWallet(wallet)
  const [fiatCurrencyCode, setFiatCurrencyCode] = React.useState(wallet.fiatCurrencyCode)
  const { execute, status, error } = useSetFiatCurrencyCode(wallet)

  return (
    <FormGroup>
      <FormLabel htmlFor={'fiatCurrencyCodes'}>FiatCurrencyCode</FormLabel>
      <FormControl
        as={'select'}
        defaultValue={wallet.fiatCurrencyCode}
        id={'fiatCurrencyCodes'}
        disabled={status === 'loading'}
        onChange={(event) => setFiatCurrencyCode(event.currentTarget.value)}
      >
        {fiatCurrencyInfos.map(({ currencyCode, isoCurrencyCode, symbol }) => (
          <option value={isoCurrencyCode} key={isoCurrencyCode}>
            {symbol} - {currencyCode}
          </option>
        ))}
      </FormControl>
      <Button onClick={() => execute({ fiatCurrencyCode })} disabled={status === 'loading'}>
        Set Fiat
      </Button>

      {error && <Alert variant={'danger'}>{error.message}</Alert>}
    </FormGroup>
  )
}

const WalletOptions = ({ wallet }: { wallet: EdgeCurrencyWallet }) => {
  return (
    <Form>
      <RenameWallet wallet={wallet} />
      <SetFiatCurrencyCode wallet={wallet} />
    </Form>
  )
}

const DisplayKeys = ({ wallet }: { wallet: EdgeCurrencyWallet }) => {
  useEdgeCurrencyWallet(wallet)

  const [showPrivateSeed, setShowPrivateSeed] = React.useState(false)
  const [showPublicSeed, setShowPublicSeed] = React.useState(false)

  return (
    <Form>
      <FormGroup>
        <FormLabel>Private Seed</FormLabel>
        <FormControl readOnly value={showPrivateSeed ? wallet.getDisplayPrivateSeed() || '' : ''} />
        <Button onClick={() => setShowPrivateSeed((x) => !x)}>Show Private Seed</Button>
      </FormGroup>

      <FormGroup>
        <FormLabel>Public Seed</FormLabel>
        <FormControl readOnly value={showPublicSeed ? wallet.getDisplayPublicSeed() || '' : ''} />
        <Button onClick={() => setShowPublicSeed((x) => !x)}>Show Public Seed</Button>
      </FormGroup>
    </Form>
  )
}
