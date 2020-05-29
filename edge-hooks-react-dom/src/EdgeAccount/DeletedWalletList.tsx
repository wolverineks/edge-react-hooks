import { EdgeAccount, EdgeWalletInfoFull } from 'edge-core-js'
import { useChangeWalletState, useEdgeAccount } from 'edge-react-hooks'
import * as React from 'react'
import { Button, Image, ListGroup } from 'react-bootstrap'

import { getDeletedWalletInfos, getLogo } from './utils'

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

  const logo = getLogo(account, { walletType: walletInfo.type })
  const shortId = `${walletInfo.id.slice(0, 4)}...${walletInfo.id.slice(-4)}`

  const { execute: changeWalletState, error, status } = useChangeWalletState(account)
  const pending = status === 'loading'
  const restoreWallet = () =>
    changeWalletState({ walletId: walletInfo.id, walletState: { deleted: false, archived: false } })

  return (
    <ListGroup.Item>
      <Image src={logo} />
      <Button disabled={pending} onClick={restoreWallet} className={'float-right'}>
        Restore
      </Button>
      {shortId}
      {error && <div>{error.message}</div>}
    </ListGroup.Item>
  )
}
