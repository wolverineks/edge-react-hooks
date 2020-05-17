import { useEdgeCurrencyWallet, useRenameWallet, useChangeWalletStates } from 'edge-react-hooks'
import * as React from 'react'

import { BalanceList } from '../EdgeAccount/BalanceList'
import { Request } from './Request'
import { Send } from './Send'
import { TransactionList } from './TransactionList'
import { Disklet } from '../Disklet/Disklet'

import { EdgeAccount, EdgeCurrencyWallet } from '../../../src/types'

const WATCH_PROPERTIES: (keyof EdgeCurrencyWallet)[] = ['name', 'fiatCurrencyCode', 'currencyInfo']

export const WalletInfo: React.FC<{ account: EdgeAccount; wallet: EdgeCurrencyWallet }> = ({ wallet, account }) => {
  const [walletName, setWalletName] = React.useState<string>(wallet.name || '')

  const { changeWalletStates, pending: changeWalletStatesPending } = useChangeWalletStates(account)
  const { renameWallet, pending: renameWalletPending } = useRenameWallet(wallet)
  const archiveWallet = () => changeWalletStates({ [wallet.id]: { deleted: false, archived: true } })
  const deleteWallet = () => changeWalletStates({ [wallet.id]: { deleted: true, archived: false } })

  useEdgeCurrencyWallet(wallet, WATCH_PROPERTIES)
  React.useEffect(() => {
    wallet.on(
      'newTransactions',
      (transactions) => transactions && alert(transactions.length > 1 ? 'New Transactions' : 'New Transaction'),
    )
  }, [wallet])

  return (
    <div>
      <h1>Wallet</h1>
      {wallet.name} - {wallet.fiatCurrencyCode} - {wallet.currencyInfo.currencyCode}{' '}
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
            Disklet
            <Disklet disklet={wallet.disklet} />
            LocalDisklet
            <Disklet disklet={wallet.localDisklet} />
          </div>
        </div>
      </div>
    </div>
  )
}
