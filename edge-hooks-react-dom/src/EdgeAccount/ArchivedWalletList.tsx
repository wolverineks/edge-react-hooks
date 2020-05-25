import { EdgeAccount } from 'edge-core-js'
import { useChangeWalletState, useWatch } from 'edge-react-hooks'
import * as React from 'react'
import { Button, ListGroup } from 'react-bootstrap'

export const ArchivedWalletList: React.FC<{ account: EdgeAccount }> = ({ account }) => {
  useWatch(account, 'archivedWalletIds')

  return (
    <ListGroup variant={'flush'}>
      {account.archivedWalletIds.map((id) => (
        <ArchivedWalletRow key={id} id={id} account={account} />
      ))}
    </ListGroup>
  )
}

const ArchivedWalletRow: React.FC<{ account: EdgeAccount; id: string }> = ({ account, id }) => {
  const walletInfo = account.allKeys.find((walletInfo) => walletInfo.id === id)
  const { changeWalletState, error, pending } = useChangeWalletState(account)

  useWatch(account, 'allKeys')

  if (!walletInfo) return <div>Wallet not found</div>

  const activateWallet = () => changeWalletState({ walletId: walletInfo.id, walletState: { archived: false } })
  const deleteWallet = () => changeWalletState({ walletId: walletInfo.id, walletState: { deleted: true } })

  return (
    <ListGroup.Item>
      <Button variant={'danger'} disabled={pending} onClick={deleteWallet} className={'float-right'}>
        Delete
      </Button>
      <Button variant={'warning'} disabled={pending} onClick={activateWallet} className={'float-right'}>
        Activate
      </Button>
      {walletInfo.id} - {walletInfo.type}
      {error && <div>{(error as Error).message}</div>}
    </ListGroup.Item>
  )
}
