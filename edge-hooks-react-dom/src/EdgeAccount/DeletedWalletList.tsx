import { EdgeAccount, EdgeWalletInfoFull } from 'edge-core-js'
import { useChangeWalletState, useEdgeAccount } from 'edge-react-hooks'
import * as React from 'react'
import { Button, ListGroup } from 'react-bootstrap'

import { Logo } from '../Components/Logo'
import { getDeletedWalletInfos, getShortId } from '../utils/utils'

export const DeletedWalletList: React.FC<{ account: EdgeAccount }> = ({ account }) => {
  useEdgeAccount(account)

  const deletedWalletInfos = getDeletedWalletInfos(account)

  return (
    <ListGroup variant={'flush'}>
      {deletedWalletInfos.map((walletInfo) => (
        <DeletedWalletRow account={account} key={walletInfo.id} walletInfo={walletInfo} />
      ))}
    </ListGroup>
  )
}

const DeletedWalletRow: React.FC<{ account: EdgeAccount; walletInfo: EdgeWalletInfoFull }> = ({
  account,
  walletInfo,
}) => {
  useEdgeAccount(account)

  const shortId = getShortId({ walletInfo })

  const { execute: changeWalletState, error, status } = useChangeWalletState(account)
  const pending = status === 'loading'
  const restoreWallet = () =>
    changeWalletState({ walletId: walletInfo.id, walletState: { deleted: false, archived: false } })

  return (
    <ListGroup style={{ paddingTop: 4, paddingBottom: 4 }}>
      <ListGroup.Item>
        <Logo account={account} walletType={walletInfo.type} />
        <Button disabled={pending} onClick={restoreWallet} className={'float-right'}>
          Restore
        </Button>
        {shortId}
        {error && <div>{error.message}</div>}
      </ListGroup.Item>
    </ListGroup>
  )
}
