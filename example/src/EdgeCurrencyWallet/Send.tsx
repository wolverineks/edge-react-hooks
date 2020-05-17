// import { useBroadcastTx, useSaveTx, useSignTx } from 'edge-react-hooks'
import * as React from 'react'

import { EdgeCurrencyWallet } from '../../../src/types'

export const Send = ({ wallet }: { wallet: EdgeCurrencyWallet }) => {
  //   const { signTx } = useSignTx()
  //   const { broadcastTx } = useBroadcastTx()
  //   const { saveTx } = useSaveTx()

  return (
    <div>
      <h1>Send</h1>

      <div>
        <label>
          To: <input onChange={(event) => null} />
        </label>
      </div>

      <div>
        <label>
          Amount: <input onChange={(event) => null} />
        </label>
      </div>
      <button onClick={() => {}}>Send</button>
    </div>
  )
}
