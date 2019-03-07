// @flow

import { type EdgeAccount, type EdgeWalletInfoFull } from 'edge-core-js'
import { useActivateWallet, useDeleteWallet, useEdgeAccount } from 'edge-react-hooks'
import React from 'react'

type Props = { account: EdgeAccount }

export const ArchivedWalletList = ({ account }: Props) => {
  useEdgeAccount(account, ['archivedWalletIds'])

  return (
    <div>
      Archived Wallets:
      {account.archivedWalletIds.map((id: string) => {
        return <ArchivedWalletRow key={id} id={id} account={account} />
      })}
    </div>
  )
}

const ArchivedWalletRow = ({ account, id }: { account: EdgeAccount, id: string }) => {
  const { activateWallet, pending: activatePending } = useActivateWallet()
  const { deleteWallet, pending: deletePending } = useDeleteWallet()

  const walletInfo = account.allKeys.find((walletInfo: EdgeWalletInfoFull) => walletInfo.id === id)
  if (!walletInfo) return null

  return (
    <div>
      <button disabled={activatePending} onClick={() => activateWallet(account, id)}>
        Activate
      </button>
      <button disabled={deletePending} onClick={() => deleteWallet(account, id)}>
        Delete
      </button>
      {walletInfo.id} - {walletInfo.type}
    </div>
  )
}
