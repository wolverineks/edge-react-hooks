import { EdgeAccount, EdgeCurrencyWallet } from 'edge-core-js'
import { useChangeWalletState, useEdgeAccount, useEdgeCurrencyWallet, useOnNewTransactions } from 'edge-react-hooks'
import * as React from 'react'
import { Button, Image, ListGroup } from 'react-bootstrap'

import { useSelectedWallet } from '../EdgeCurrencyWallet/useSelectedWallet'
import { getLogo, getSortedCurrencyWallets } from './utils'

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

  const logo = getLogo(account, { walletType: wallet.type })

  useOnNewTransactions(wallet, (transactions) =>
    alert(`${wallet.name} - ${transactions.length > 1 ? 'New Transactions' : 'New Transaction'}`),
  )

  return (
    <ListGroup.Item variant={selectedWallet && wallet.id === selectedWallet.id ? 'primary' : undefined}>
      <span onClick={() => onSelect(wallet)}>
        <Image src={logo} /> {wallet.name} - {wallet.syncRatio.toString()}
      </span>
      <Button variant={'danger'} disabled={pending} onClick={deleteWallet} className={'float-right'}>
        Delete
      </Button>
      <Button variant={'warning'} disabled={pending} onClick={archiveWallet} className={'float-right'}>
        Archive
      </Button>
    </ListGroup.Item>
  )
}
