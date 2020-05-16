import { type EdgeAccount, type EdgeWalletInfoFull } from 'edge-core-js'
import { useChangeWalletStates, useEdgeAccount } from 'edge-react-hooks'
import * as React from 'react'

export const ArchivedWalletList: React.FC<{ account: EdgeAccount }> = ({ account }) => {
  useEdgeAccount(account, ['archivedWalletIds'])

  return (
    <div>
      Archived Wallets:
      {account.archivedWalletIds
        .map((id: string) => account.allKeys.find((walletInfo) => walletInfo.id === id))
        .filter(Boolean)
        .map((walletInfo) => (
          <ArchivedWalletRow key={walletInfo.id} account={account} walletInfo={walletInfo} />
        ))}
    </div>
  )
}

const ArchivedWalletRow: React.FC<{ account: EdgeAccount, id: string, walletInfo: EdgeWalletInfoFull }> = ({
  account,
  walletInfo,
}) => {
  const { changeWalletStates, pending, error } = useChangeWalletStates()
  const activateWallet = () => changeWalletStates(account, { [walletInfo.id]: { deleted: false, archived: false } })
  const deleteWallet = () => changeWalletStates(account, { [walletInfo.id]: { deleted: true, archived: false } })

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
