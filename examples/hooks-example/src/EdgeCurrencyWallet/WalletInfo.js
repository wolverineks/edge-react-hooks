import { type EdgeAccount, type EdgeCurrencyWallet, type EdgeTransaction } from 'edge-core-js'
import { useEdgeCurrencyWallet, useRenameWallet, useChangeWalletStates } from 'edge-react-hooks'
import * as React from 'react'

import { BalanceList } from '../EdgeAccount/BalanceList.js'
import { Request } from './Request.js'
import { Send } from './Send.js'
import { TransactionList } from './TransactionList.js'
import { Disklet } from '../Disklet.js'

export const WalletInfo: React.FC<{ account: EdgeAccount, wallet: EdgeCurrencyWallet }> = ({ wallet, account }) => {
  const [walletName, setWalletName] = React.useState < string > ''

  const changeWalletStates = useChangeWalletStates()
  const { renameWallet } = useRenameWallet()
  const { archiveWallet } = () => changeWalletStates(account, { [wallet.id]: { deleted: false, archived: true } })
  const { deleteWallet } = () => changeWalletStates(account, { [wallet.id]: { deleted: true, archived: false } })

  useEdgeCurrencyWallet(wallet, ['name', 'fiatCurrencyCode', 'currencyInfo'])
  React.useEffect(() => wallet.on('newTransactions', displayTransactionAlert), [wallet])

  return (
    <div>
      <h1>Wallet</h1>
      {wallet.name} - {wallet.fiatCurrencyCode} - {wallet.currencyInfo.currencyCode}{' '}
      <div style={{ display: 'flex' }}>
        <div>
          <button onClick={() => archiveWallet(account, wallet.id)}>Archive</button>
          <button onClick={() => deleteWallet(account, wallet.id)}>Delete</button>
          <input value={walletName} onChange={(event) => setWalletName(event.currentTarget.value)} />
          <button onClick={() => renameWallet(wallet, walletName)}>Rename</button>
          <BalanceList account={account} wallet={wallet} />

          <div style={{ display: 'flex' }}>
            <div>
              <TransactionList key={wallet.id} account={account} wallet={wallet} />
            </div>
            <Send wallet={wallet} />
            <Request wallet={wallet} />
            <br />
            Disklet
            <Disklet disklet={wallet.disklet} />
            LocalDisklet
            <Disklet disklet={wallet.disklet} />
          </div>
        </div>
      </div>
    </div>
  )
}

const displayTransactionAlert = (transactions: Array<EdgeTransaction>) =>
  alert(transactions.length > 1 ? 'New Transactions' : 'New Transaction')

export const useOnNewTransactions = (
  wallet: EdgeCurrencyWallet,
  callback: (transactions: Array<EdgeTransaction>) => mixed,
) => React.useEffect(() => wallet.on('newTransactions', callback), [callback, wallet])
