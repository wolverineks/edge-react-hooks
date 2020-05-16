import { type EdgeAccount, type EdgeWalletInfoFull } from 'edge-core-js'
import { useEdgeAccount, useChangeWalletStates } from 'edge-react-hooks'
import * as React from 'react'

export const DeletedWalletList: React.FC<{ account: EdgeAccount }> = ({ account }) => {
  useEdgeAccount(account, ['allKeys'])

  return (
    <div>
      Deleted Wallets:
      {account.allKeys
        .filter((walletInfo) => walletInfo.deleted)
        .map((walletInfo: EdgeWalletInfoFull) => (
          <DeletedWalletRow account={account} key={walletInfo.id} walletInfo={walletInfo} />
        ))}
    </div>
  )
}

const DeletedWalletRow: React.FC<{ account: EdgeAccount, walletInfo: EdgeWalletInfoFull }> = ({
  account,
  walletInfo: { type, id },
}) => {
  const { changeWalletStates, pending, error } = useChangeWalletStates()
  const restoreWallet = () => changeWalletStates(account, { [id]: { deleted: false, archived: false } })

  return (
    <div>
      <button disabled={pending} onClick={restoreWallet}>
        Restore
      </button>
      {id} - {type}
      {error && <div>{error.message}</div>}
    </div>
  )
}
