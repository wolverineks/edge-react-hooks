import { EdgeAccount, EdgeWalletInfoFull } from 'edge-core-js'
import { useChangeWalletState, useEdgeAccount } from 'edge-react-hooks'
import * as React from 'react'
import { Button, Image, ListGroup } from 'react-bootstrap'

import { getArchivedWalletInfos, getLogo } from './utils'

export const ArchivedWalletList: React.FC<{ account: EdgeAccount }> = ({ account }) => {
  useEdgeAccount(account)

  const archivedWalletInfos = getArchivedWalletInfos(account)

  return (
    <ListGroup variant={'flush'}>
      {archivedWalletInfos.map((walletInfo) => (
        <ArchivedWalletRow key={walletInfo.id} account={account} walletInfo={walletInfo} />
      ))}
    </ListGroup>
  )
}

const ArchivedWalletRow: React.FC<{ account: EdgeAccount; walletInfo: EdgeWalletInfoFull }> = ({
  account,
  walletInfo,
}) => {
  useEdgeAccount(account)

  const logo = getLogo(account, { walletType: walletInfo.type })
  const shortId = `${walletInfo.id.slice(0, 4)}...${walletInfo.id.slice(-4)}`

  const { execute: changeWalletState, error, status } = useChangeWalletState(account)
  const pending = status === 'loading'
  const activateWallet = () => changeWalletState({ walletId: walletInfo.id, walletState: { archived: false } })
  const deleteWallet = () => changeWalletState({ walletId: walletInfo.id, walletState: { deleted: true } })

  return (
    <ListGroup.Item>
      <Image src={logo} />
      <Button variant={'danger'} disabled={pending} onClick={deleteWallet} className={'float-right'}>
        Delete
      </Button>
      <Button variant={'warning'} disabled={pending} onClick={activateWallet} className={'float-right'}>
        Activate
      </Button>
      {shortId}
      {error && <div>{error.message}</div>}
    </ListGroup.Item>
  )
}
