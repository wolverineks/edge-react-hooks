import { EdgeAccount, EdgeCurrencyWallet } from 'edge-core-js'
import { useChangeWalletState, useOnNewTransactions, useWatch } from 'edge-react-hooks'
import * as React from 'react'
import { Button, ListGroup } from 'react-bootstrap'

import { useSelectWallet, useSelectedWallet } from '../EdgeCurrencyWallet/useSelectedWallet'

export const ActiveWalletList: React.FC<{ account: EdgeAccount; onSelect: Function }> = ({ account, onSelect }) => {
  useWatch(account, 'activeWalletIds')
  useWatch(account, 'currencyWallets')

  return (
    <ListGroup variant={'flush'}>
      {account.activeWalletIds
        .map((id) => account.currencyWallets[id])
        .map((wallet, index) =>
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
  const selectWallet = useSelectWallet()
  const selectedWallet = useSelectedWallet()
  const { changeWalletState, pending } = useChangeWalletState(account)
  const archiveWallet = () => changeWalletState({ walletId: wallet.id, walletState: { archived: true } })
  const deleteWallet = () => changeWalletState({ walletId: wallet.id, walletState: { deleted: true } })

  useWatch(wallet, 'name')
  useWatch(wallet, 'syncRatio')

  useOnNewTransactions(wallet, (transactions) => {
    alert(`${wallet.name} - ${transactions.length > 1 ? 'New Transactions' : 'New Transaction'}`)
  })

  return (
    <ListGroup.Item variant={selectedWallet && wallet.id === selectedWallet.id ? 'primary' : undefined}>
      {wallet.name} - {wallet.syncRatio.toString()}
      <Button variant={'danger'} disabled={pending} onClick={deleteWallet} className={'float-right'}>
        Delete
      </Button>
      <Button variant={'warning'} disabled={pending} onClick={archiveWallet} className={'float-right'}>
        Archive
      </Button>
      {selectedWallet && wallet.id !== selectedWallet.id && (
        <Button
          className={'float-right'}
          variant={'primary'}
          disabled={pending}
          onClick={() => {
            selectWallet(wallet)
            onSelect()
          }}
        >
          Select
        </Button>
      )}
    </ListGroup.Item>
  )
}
