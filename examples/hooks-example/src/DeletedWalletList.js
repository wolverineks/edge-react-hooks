// @flow

import { type EdgeAccount, type EdgeWalletInfoFull } from 'edge-core-js'
import { useEdgeAccount, useRestoreWallet } from 'edge-react-hooks'
import React from 'react'

export const DeletedWalletList = ({ account }: { account: EdgeAccount }) => {
  useEdgeAccount(account, ['allKeys'])

  return (
    <div>
      Deleted Wallets:
      {account.allKeys
        .filter(walletInfo => walletInfo.deleted)
        .map((walletInfo: EdgeWalletInfoFull) => (
          <DeletedWalletRow account={account} key={walletInfo.id} id={walletInfo.id} type={walletInfo.type} />
        ))}
    </div>
  )
}

const DeletedWalletRow = ({ account, id, type }) => {
  const { restoreWallet, pending } = useRestoreWallet()

  return (
    <div>
      <button disabled={pending} onClick={() => account.changeWalletStates({ [id]: { deleted: false } })}>
        Undelete
      </button>
      <button disabled={pending} onClick={() => restoreWallet(account, id)}>
        Restore
      </button>
      {id} - {type}
    </div>
  )
}
