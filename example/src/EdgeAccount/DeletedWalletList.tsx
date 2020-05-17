import { useEdgeAccount, useChangeWalletStates } from 'edge-react-hooks'
import * as React from 'react'

import { EdgeAccount, EdgeWalletInfoFull } from '../../../src/types'

const accountProperties: (keyof EdgeAccount)[] = ['allKeys']

export const DeletedWalletList: React.FC<{ account: EdgeAccount }> = ({ account }) => {
  useEdgeAccount(account, accountProperties)

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

const DeletedWalletRow: React.FC<{ account: EdgeAccount; walletInfo: EdgeWalletInfoFull }> = ({
  account,
  walletInfo: { type, id },
}) => {
  const { changeWalletStates, pending, error } = useChangeWalletStates(account)
  const restoreWallet = () => changeWalletStates({ [id]: { deleted: false, archived: false } })

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
