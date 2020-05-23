import { EdgeAccount } from 'edge-core-js'
import { useChangeWalletState, useWatch } from 'edge-react-hooks'
import * as React from 'react'

export const ArchivedWalletList: React.FC<{ account: EdgeAccount }> = ({ account }) => {
  useWatch(account, 'archivedWalletIds')

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
  const { changeWalletState, error, pending } = useChangeWalletState(account)

  useWatch(account, 'allKeys')

  if (!walletInfo) return <div>Wallet not found</div>

  const activateWallet = () => changeWalletState({ walletId: walletInfo.id, walletState: { archived: false } })
  const deleteWallet = () => changeWalletState({ walletId: walletInfo.id, walletState: { deleted: true } })

  return (
    <div>
      <button disabled={pending} onClick={activateWallet}>
        Activate
      </button>
      <button disabled={pending} onClick={deleteWallet}>
        Delete
      </button>
      {walletInfo.id} - {walletInfo.type}
      {error && <div>{(error as Error).message}</div>}
    </div>
  )
}
