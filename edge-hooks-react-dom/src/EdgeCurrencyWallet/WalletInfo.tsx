import { EdgeAccount, EdgeCurrencyWallet } from 'edge-core-js'
import {
  useChangeWalletState,
  useEnableTokens,
  useEnabledTokens,
  useOnNewTransactions,
  useRenameWallet,
  useSetFiatCurrencyCode,
  useWatch,
} from 'edge-react-hooks'
import * as React from 'react'

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

export const WalletInfo: React.FC<{ account: EdgeAccount; wallet: EdgeCurrencyWallet }> = ({ wallet, account }) => {
  useWatch(wallet, 'name')
  useWatch(wallet, 'fiatCurrencyCode')
  useWatch(wallet, 'currencyInfo')

  useOnNewTransactions(
    wallet,
    (transactions) => transactions && alert(transactions.length > 1 ? 'New Transactions' : 'New Transaction'),
  )

  return (
    <div>
      <h1>Wallet</h1>
      {wallet.name} - {wallet.fiatCurrencyCode} - {wallet.currencyInfo.currencyCode}
      <div style={{ display: 'flex' }}>
        <div>
          <WalletOptions wallet={wallet} account={account} />
          <br />
          <SetFiatCurrencyCode wallet={wallet} />
          <BalanceList wallet={wallet} />
          <div style={{ display: 'flex' }}>
            <div>
              <TransactionList key={wallet.id} wallet={wallet} />
            </div>
            <Send wallet={wallet} />
            <Request wallet={wallet} />
            <br />
            <Tokens wallet={wallet} />
          </div>
          Disklet
          <Disklet disklet={wallet.disklet} />
          LocalDisklet
          <Disklet disklet={wallet.localDisklet} />
        </div>
      </div>
      <DisplayKeys wallet={wallet} />
    </div>
  )
}

const Tokens: React.FC<{ wallet: EdgeCurrencyWallet }> = ({ wallet }) => {
  const { enabledTokens } = useEnabledTokens(wallet)
  const { enableTokens } = useEnableTokens(wallet)
  const availableTokens = wallet.currencyInfo.metaTokens

  return (
    <div>
      Tokens
      {!enabledTokens ? (
        <div>Loading...</div>
      ) : enabledTokens.length <= 0 ? (
        <div>No Tokens Enabled</div>
      ) : (
        enabledTokens.map((token) => <div key={token}>{token}</div>)
      )}
      <div>Enable Tokens</div>
      {availableTokens.length >= 0 ? (
        <div>No Tokens Available</div>
      ) : (
        availableTokens.map((token) => (
          <div key={token.currencyCode}>
            <button onClick={() => enableTokens({ tokens: [token.currencyCode] })}>
              {token.currencyName} - {token.currencyCode}
            </button>
          </div>
        ))
      )}
    </div>
  )
}

const SetFiatCurrencyCode = ({ wallet }: { wallet: EdgeCurrencyWallet }) => {
  const { setFiatCurrencyCode, pending } = useSetFiatCurrencyCode(wallet)

  return (
    <div>
      <label htmlFor={'fiatCurrencyCodes'}>FiatCurrencyCode</label>
      <select
        defaultValue={wallet.fiatCurrencyCode}
        id={'fiatCurrencyCodes'}
        disabled={pending}
        onChange={(event) => setFiatCurrencyCode({ fiatCurrencyCode: event.currentTarget.value })}
      >
        {FIAT_CURRENCY_CODES.map(({ display, value }) => (
          <option value={value} key={value}>
            {display}
          </option>
        ))}
      </select>
    </div>
  )
}

const WalletOptions = ({ wallet, account }: { wallet: EdgeCurrencyWallet; account: EdgeAccount }) => {
  const [walletName, setWalletName] = React.useState<string>(wallet.name || '')

  const { changeWalletState, pending: changeWalletStatePending } = useChangeWalletState(account)
  const { renameWallet, pending: renameWalletPending } = useRenameWallet(wallet)
  const archiveWallet = () =>
    changeWalletState({ walletId: wallet.id, walletState: { deleted: false, archived: true } })
  const deleteWallet = () => changeWalletState({ walletId: wallet.id, walletState: { deleted: true, archived: false } })

  return (
    <div>
      <button onClick={() => archiveWallet()} disabled={changeWalletStatePending}>
        Archive
      </button>
      <button onClick={() => deleteWallet()} disabled={changeWalletStatePending}>
        Delete
      </button>
      <input value={walletName} onChange={(event) => setWalletName(event.currentTarget.value)} />
      <button onClick={() => renameWallet({ name: walletName })} disabled={renameWalletPending}>
        Rename
      </button>
    </div>
  )
}

const DisplayKeys = ({ wallet }: { wallet: EdgeCurrencyWallet }) => {
  const [showPrivateKey, setShowPrivateKey] = React.useState(false)
  const [showPublicKey, setShowPublicKey] = React.useState(false)

  return (
    <div>
      <div>
        <button onClick={() => setShowPrivateKey((x) => !x)}>Show Private Key</button>
        Private Key: {showPrivateKey ? wallet.getDisplayPrivateSeed() : '***************'}
      </div>
      <div>
        <button onClick={() => setShowPublicKey((x) => !x)}>Show Private Key</button>
        Public Key: {showPublicKey ? wallet.getDisplayPublicSeed() : '***************'}
      </div>
    </div>
  )
}
