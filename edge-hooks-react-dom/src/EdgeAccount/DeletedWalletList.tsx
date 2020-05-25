import { EdgeAccount, EdgeWalletInfoFull } from 'edge-core-js'
import { useChangeWalletState, useWatch } from 'edge-react-hooks'
import * as React from 'react'
import { Button, ListGroup } from 'react-bootstrap'

export const DeletedWalletList: React.FC<{ account: EdgeAccount }> = ({ account }) => {
  useWatch(account, 'allKeys')

  return (
    <ListGroup variant={'flush'}>
      {account.allKeys
        .filter((walletInfo) => walletInfo.deleted)
        .map((walletInfo: EdgeWalletInfoFull) => (
          <DeletedWalletRow account={account} key={walletInfo.id} walletInfo={walletInfo} />
        ))}
    </ListGroup>
  )
}

const DeletedWalletRow: React.FC<{ account: EdgeAccount; walletInfo: EdgeWalletInfoFull }> = ({
  account,
  walletInfo,
}) => {
  const { changeWalletState, error, status } = useChangeWalletState(account)
  const restoreWallet = () =>
    changeWalletState({ walletId: walletInfo.id, walletState: { deleted: false, archived: false } })

  return (
    <ListGroup.Item>
      <Button disabled={status === 'loading'} onClick={restoreWallet} className={'float-right'}>
        Restore
      </Button>
      {walletInfo.id} - {walletInfo.type}
      {error && <div>{(error as Error).message}</div>}
    </ListGroup.Item>
  )
}
