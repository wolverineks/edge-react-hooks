// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
// import { useBroadcastTx, useSaveTx, useSignTx } from 'edge-react-hooks'
import React from 'react'

export const Send = ({ wallet }: { wallet: EdgeCurrencyWallet }) => {
  //   const { signTx } = useSignTx()
  //   const { broadcastTx } = useBroadcastTx()
  //   const { saveTx } = useSaveTx()

  return (
    <div>
      <h1>Send</h1>

      <div>
        <label>
          To: <input onChange={event => null} />
        </label>
      </div>

      <div>
        <label>
          Amount: <input onChange={event => null} />
        </label>
      </div>
      <button onClick={() => {}}>Send</button>
    </div>
  )
}
