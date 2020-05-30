import { EdgeAccount, EdgeCurrencyWallet } from 'edge-core-js'
import {
  useChangeWalletState,
  useConvertCurrency,
  useEdgeAccount,
  useEdgeCurrencyWallet,
  useOnNewTransactions,
} from 'edge-react-hooks'
import * as React from 'react'
import { Button, ListGroup } from 'react-bootstrap'

import { Logo } from '../Components/Logo'
import { useSelectedWallet } from '../EdgeCurrencyWallet/useSelectedWallet'
import { getCurrencySymbol, getFiatInfo, getSortedCurrencyWallets } from '../utils'

export const ActiveWalletList: React.FC<{ account: EdgeAccount; onSelect: (wallet: EdgeCurrencyWallet) => any }> = ({
  account,
  onSelect,
}) => {
  useEdgeAccount(account)
  const wallets = getSortedCurrencyWallets(account)

  return (
    <ListGroup variant={'flush'}>
      {wallets.map((wallet, index) =>
        wallet ? (
          <ActiveWalletRow account={account} wallet={wallet} key={wallet.id} onSelect={onSelect} />
        ) : (
          <ListGroup.Item key={index}>Loading...</ListGroup.Item>
        ),
      )}
    </ListGroup>
  )
}

const ActiveWalletRow: React.FC<{ wallet: EdgeCurrencyWallet; account: EdgeAccount; onSelect: Function }> = ({
  account,
  wallet,
  onSelect,
}) => {
  useEdgeAccount(account)
  useEdgeCurrencyWallet(wallet)

  const selectedWallet = useSelectedWallet()

  const { execute: changeWalletState, status } = useChangeWalletState(account)
  const pending = status === 'loading'
  const archiveWallet = () => changeWalletState({ walletId: wallet.id, walletState: { archived: true } })
  const deleteWallet = () => changeWalletState({ walletId: wallet.id, walletState: { deleted: true } })

  const currencyCode = wallet.currencyInfo.currencyCode
  const balance = wallet.balances[currencyCode]
  const { data: fiatAmount } = useConvertCurrency(account.rateCache, {
    fromCurrency: currencyCode,
    toCurrency: wallet.fiatCurrencyCode,
    amount: 1, //Number(balance),
  })
  const fiatInfo = getFiatInfo({ currencyCode: wallet.fiatCurrencyCode })

  useOnNewTransactions(wallet, (transactions) =>
    alert(`${wallet.name} - ${transactions.length > 1 ? 'New Transactions' : 'New Transaction'}`),
  )

  const symbol = getCurrencySymbol(account, { walletType: wallet.type })

  return (
    <ListGroup.Item variant={selectedWallet && wallet.id === selectedWallet.id ? 'primary' : undefined}>
      <span onClick={() => onSelect(wallet)} className={'float-left'}>
        <Logo account={account} walletType={wallet.type} />
        {wallet.name}: {symbol} {balance} {currencyCode} - {fiatInfo?.symbol} {(fiatAmount || 0).toFixed(2)}{' '}
        {fiatInfo?.currencyCode}
      </span>

      <span className={'float-right'}>
        <Button variant={'danger'} disabled={pending} onClick={deleteWallet}>
          Delete
        </Button>
        <Button variant={'warning'} disabled={pending} onClick={archiveWallet}>
          Archive
        </Button>
      </span>
    </ListGroup.Item>
  )
}
