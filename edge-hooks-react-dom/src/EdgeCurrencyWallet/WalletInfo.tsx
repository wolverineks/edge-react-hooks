import { EdgeAccount, EdgeCurrencyWallet } from 'edge-core-js'
import {
  useEnableTokens,
  useEnabledTokens,
  useOnNewTransactions,
  useRenameWallet,
  useSetFiatCurrencyCode,
  useWatch,
} from 'edge-react-hooks'
import * as React from 'react'
import { Alert, Button, Card, Form, FormControl, FormGroup, FormLabel, ListGroup, Tab, Tabs } from 'react-bootstrap'

import { Disklet } from '../Disklet/Disklet'
import { BalanceList } from '../EdgeAccount/BalanceList'
import { Request } from './Request'
import { Send } from './Send'
import { TransactionList } from './TransactionList'

const FIAT_CURRENCY_CODES = [
  { value: 'iso:USD', display: 'US Dollars' },
  { value: 'iso:EUR', display: 'Euros' },
  { value: 'iso:CAD', display: 'Canadian Dollars' },
]

export const WalletInfo: React.FC<{ account: EdgeAccount; wallet: EdgeCurrencyWallet }> = ({ wallet }) => {
  useWatch(wallet, 'name')
  useWatch(wallet, 'fiatCurrencyCode')
  useWatch(wallet, 'currencyInfo')

  useOnNewTransactions(
    wallet,
    (transactions) => transactions && alert(transactions.length > 1 ? 'New Transactions' : 'New Transaction'),
  )

  if (!wallet) return null

  return (
    <Tabs id={'walletTabs'} defaultActiveKey={'details'}>
      <Tab eventKey={'details'} title={'Details'}>
        <WalletOptions wallet={wallet} />
        <DisplayKeys wallet={wallet} />
        <BalanceList wallet={wallet} />
        <EnabledTokens wallet={wallet} />
        <EnableTokens wallet={wallet} />
        <Disklet disklet={wallet.disklet} title={'Disklet'} />
        <Disklet disklet={wallet.localDisklet} title={'Local Disklet'} />
      </Tab>

      <Tab eventKey={'transactions'} title={'Transactions'}>
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
  const { enabledTokens } = useEnabledTokens(wallet)

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
  const { enableTokens } = useEnableTokens(wallet)
  const availableTokens = wallet.currencyInfo.metaTokens

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

const WalletOptions = ({ wallet }: { wallet: EdgeCurrencyWallet }) => {
  const [walletName, setWalletName] = React.useState<string>(wallet.name || '')
  const [fiatCurrencyCode, setFiatCurrencyCode] = React.useState(wallet.fiatCurrencyCode)
  const { renameWallet, pending: renameWalletPending } = useRenameWallet(wallet)
  const {
    setFiatCurrencyCode: _setFiatCurrencyCode,
    pending: setFiatCurrencyCodePending,
    error: setFiatCurrencyCodeError,
  } = useSetFiatCurrencyCode(wallet)

  return (
    <Form>
      <FormGroup>
        <Form.Label>Wallet Name</Form.Label>
        <FormControl value={walletName} onChange={(event) => setWalletName(event.currentTarget.value)} />
        <Button onClick={() => renameWallet({ name: walletName })} disabled={renameWalletPending}>
          Rename
        </Button>
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor={'fiatCurrencyCodes'}>FiatCurrencyCode</FormLabel>
        <FormControl
          as={'select'}
          defaultValue={wallet.fiatCurrencyCode}
          id={'fiatCurrencyCodes'}
          disabled={setFiatCurrencyCodePending}
          onChange={(event) => setFiatCurrencyCode(event.currentTarget.value)}
        >
          {FIAT_CURRENCY_CODES.map(({ display, value }) => (
            <option value={value} key={value}>
              {display}
            </option>
          ))}
        </FormControl>
        <Button onClick={() => _setFiatCurrencyCode({ fiatCurrencyCode })} disabled={setFiatCurrencyCodePending}>
          Set Fiat
        </Button>

        {setFiatCurrencyCodeError && <Alert variant={'danger'}>{(setFiatCurrencyCodeError as Error).message}</Alert>}
      </FormGroup>
    </Form>
  )
}

const DisplayKeys = ({ wallet }: { wallet: EdgeCurrencyWallet }) => {
  const [showPrivateKey, setShowPrivateKey] = React.useState(false)
  const [showPublicKey, setShowPublicKey] = React.useState(false)

  return (
    <div>
      <div>
        <Button onClick={() => setShowPrivateKey((x) => !x)}>Show Private Key</Button>
        Private Key: {showPrivateKey ? wallet.getDisplayPrivateSeed() : '***************'}
      </div>
      <div>
        <Button onClick={() => setShowPublicKey((x) => !x)}>Show Private Key</Button>
        Public Key: {showPublicKey ? wallet.getDisplayPublicSeed() : '***************'}
      </div>
    </div>
  )
}
