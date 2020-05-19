import { EdgeAccount, EdgeCurrencyWallet } from 'edge-core-js'
import {
  useChangeWalletStates,
  useEnableTokens,
  useEnabledTokens,
  useOnNewTransactions,
  useRenameWallet,
  useWatch,
} from 'edge-react-hooks'
import * as React from 'react'

import { Disklet } from '../Disklet/Disklet'
import { BalanceList } from '../EdgeAccount/BalanceList'
import { Request } from './Request'
import { Send } from './Send'
import { TransactionList } from './TransactionList'

export const WalletInfo: React.FC<{ account: EdgeAccount; wallet: EdgeCurrencyWallet }> = ({ wallet, account }) => {
  const [walletName, setWalletName] = React.useState<string>(wallet.name || '')

  const { changeWalletStates, pending: changeWalletStatesPending } = useChangeWalletStates(account)
  const { renameWallet, pending: renameWalletPending } = useRenameWallet(wallet)
  const archiveWallet = () => changeWalletStates({ [wallet.id]: { deleted: false, archived: true } })
  const deleteWallet = () => changeWalletStates({ [wallet.id]: { deleted: true, archived: false } })

  const [showPrivateKey, setShowPrivateKey] = React.useState(false)
  const [showPublicKey, setShowPublicKey] = React.useState(false)

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
          <button onClick={() => archiveWallet()} disabled={changeWalletStatesPending}>
            Archive
          </button>
          <button onClick={() => deleteWallet()} disabled={changeWalletStatesPending}>
            Delete
          </button>
          <input value={walletName} onChange={(event) => setWalletName(event.currentTarget.value)} />
          <button onClick={() => renameWallet(walletName)} disabled={renameWalletPending}>
            Rename
          </button>
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
            <button onClick={() => enableTokens([token.currencyCode])}>
              {token.currencyName} - {token.currencyCode}
            </button>
          </div>
        ))
      )}
    </div>
  )
}
