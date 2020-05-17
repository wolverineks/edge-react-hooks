import { useChangeWalletStates, useEdgeAccount } from 'edge-react-hooks'
import * as React from 'react'

import { EdgeAccount } from '../../../src/types'

const accountProperties: (keyof EdgeAccount)[] = ['archivedWalletIds']

export const ArchivedWalletList: React.FC<{ account: EdgeAccount }> = ({ account }) => {
  useEdgeAccount(account, accountProperties)

  return (
    <div>
      Archived Wallets:
      {account.archivedWalletIds.map((id) => (
        <ArchivedWalletRow key={id} id={id} account={account} />
      ))}
    </div>
  )
}

const ArchivedWalletRow: React.FC<{ account: EdgeAccount; id: string }> = ({ account, id }) => {
  const walletInfo = account.allKeys.find((walletInfo) => walletInfo.id === id)
  const { changeWalletStates, pending, error } = useChangeWalletStates(account)

  if (!walletInfo) return <div>Wallet not found</div>

  const activateWallet = () => changeWalletStates({ [walletInfo.id]: { deleted: false, archived: false } })
  const deleteWallet = () => changeWalletStates({ [walletInfo.id]: { deleted: true, archived: false } })

  return (
    <div>
      <button disabled={pending} onClick={activateWallet}>
        Activate
      </button>
      <button disabled={pending} onClick={deleteWallet}>
        Delete
      </button>
      {walletInfo.id} - {walletInfo.type}
      {error && <div>{error.message}</div>}
    </div>
  )
}
